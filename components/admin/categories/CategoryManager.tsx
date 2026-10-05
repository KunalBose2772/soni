"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import PageHeader from "@/components/admin/shared/PageHeader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

type Category = {
  id: string;
  name: string;
  galleryCount: number;
  createdAt: string;
};

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to load categories");
        return;
      }
      setCategories(data.categories);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to create category");
        return;
      }
      setName("");
      toast.success("Category created");
      void fetchCategories();
    } catch {
      toast.error("Failed to create category");
    }
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim()) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to update category");
        return;
      }
      setEditingId(null);
      toast.success("Category updated");
      void fetchCategories();
    } catch {
      toast.error("Failed to update category");
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category? All gallery images in it will also be deleted.")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to delete category");
        return;
      }
      toast.success("Category deleted");
      void fetchCategories();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div>
      <PageHeader
        title="Category Management"
        description="Create and manage gallery categories dynamically."
      />

      <form onSubmit={createCategory} className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
        >
          <Plus size={16} />
          Add Category
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Images</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    {editingId === cat.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm"
                      />
                    ) : (
                      <span className="font-medium text-slate-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{cat.galleryCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {editingId === cat.id ? (
                        <button
                          type="button"
                          onClick={() => void saveEdit(cat.id)}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(cat.id);
                            setEditName(cat.name);
                          }}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => void deleteCategory(cat.id)}
                        className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
