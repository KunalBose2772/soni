"use client";

import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import PageHeader from "@/components/admin/shared/PageHeader";
import LoadingSpinner from "@/components/admin/shared/LoadingSpinner";

type Category = { id: string; name: string };
type GalleryItem = {
  id: string;
  imageUrl: string;
  title: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
};

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [preview, setPreview] = useState<GalleryItem | null>(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [catRes, galRes] = await Promise.all([
        fetch("/api/categories"),
        fetch(`/api/gallery${filterCategoryId ? `?categoryId=${filterCategoryId}` : ""}`),
      ]);
      const catData = await catRes.json();
      const galData = await galRes.json();
      if (catRes.ok && catData.success) {
        setCategories(catData.categories.map((c: { id: string; name: string }) => ({ id: c.id, name: c.name })));
      }
      if (galRes.ok && galData.success) {
        setItems(galData.items);
      }
    } catch {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }, [filterCategoryId]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const resetForm = () => {
    setShowForm(false);
    setEditing(null);
    setTitle("");
    setCategoryId("");
    setNewCategoryName("");
    setImageFile(null);
    setImagePreview("");
  };

  const createCategoryIfNeeded = async (): Promise<string | null> => {
    if (categoryId) return categoryId;
    if (!newCategoryName.trim()) {
      toast.error("Select or create a category");
      return null;
    }
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName.trim() }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      toast.error(data.message ?? "Failed to create category");
      return null;
    }
    return data.category.id as string;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resolvedCategoryId = await createCategoryIfNeeded();
      if (!resolvedCategoryId || !title.trim()) {
        setSubmitting(false);
        return;
      }

      if (editing) {
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("categoryId", resolvedCategoryId);
        if (imageFile) formData.append("image", imageFile);
        const res = await fetch(`/api/gallery/${editing.id}`, { method: "PATCH", body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) {
          toast.error(data.message ?? "Failed to update image");
          return;
        }
        toast.success("Gallery item updated");
      } else {
        if (!imageFile) {
          toast.error("Please select an image");
          return;
        }
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("categoryId", resolvedCategoryId);
        formData.append("image", imageFile);
        const res = await fetch("/api/gallery", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) {
          toast.error(data.message ?? "Failed to upload image");
          return;
        }
        toast.success("Image uploaded");
      }
      resetForm();
      void fetchData();
    } catch {
      toast.error("Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Failed to delete");
        return;
      }
      toast.success("Image deleted");
      void fetchData();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <PageHeader
        title="Gallery Management"
        description="Upload and manage gallery images with dynamic categories."
      />

      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 w-full sm:max-w-xs">
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            className="h-12 w-full rounded-lg border border-slate-200 px-3 text-sm sm:h-auto sm:py-2.5"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-orange-600 px-3 text-sm font-semibold text-white hover:bg-orange-700 sm:h-auto sm:px-4 sm:py-2.5"
        >
          <Plus size={16} />
          Upload Image
        </button>
      </div>

      {showForm ? (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-semibold text-slate-900">{editing ? "Edit Image" : "Upload Image"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Or create new category"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              {/* <label className="mb-1 block text-sm font-medium text-slate-700">
                {editing ? "Replace image (optional)" : "Image"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setImageFile(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setImagePreview(event.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  } else {
                    setImagePreview("");
                  }
                }}
                className="w-full text-sm"
              /> */}

              <label className="mb-1 block text-sm font-medium text-slate-700">
  {editing ? "Replace image (optional)" : "Image"}
</label>

<label className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 px-4 py-6 text-sm font-medium text-orange-600 transition-all duration-300 hover:border-orange-500 hover:bg-orange-100">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0] ?? null;
      setImageFile(file);

      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          setImagePreview(event.target?.result as string);
        };

        reader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    }}
    className="hidden"
  />

  <div className="flex flex-col items-center gap-2 text-center">
    <span className="text-lg">📁</span>

    <span>
      {imageFile ? imageFile.name : "Click to Upload Image"}
    </span>

    <span className="text-xs text-slate-500">
      PNG, JPG, WEBP supported
    </span>
  </div>
</label>
              {imagePreview && (
                <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  <img src={imagePreview} alt="Preview" className="h-40 w-full object-cover" />
                  <p className="px-3 py-2 text-xs text-slate-500">{imageFile?.name}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:from-orange-700 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent"></span>
                  Saving...
                </>
              ) : editing ? (
                "Update Image"
              ) : (
                "Upload Image"
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="relative h-48 w-full bg-slate-100">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" unoptimized />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">{item.categoryName}</p>
                <h3 className="mt-1 font-semibold text-slate-900">{item.title}</h3>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPreview(item)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600"
                  >
                    <Eye size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(item);
                      setTitle(item.title);
                      setCategoryId(item.categoryId);
                      setShowForm(true);
                    }}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteItem(item.id)}
                    className="rounded-lg border border-rose-200 p-2 text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-black">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute right-3 top-3 z-10 rounded-full bg-white/20 px-3 py-1 text-sm text-white"
            >
              Close
            </button>
            <img src={preview.imageUrl} alt={preview.title} className="max-h-[85vh] w-full object-contain" />
            <div className="border-t border-white/10 px-4 py-3 text-white">
              <p className="text-xs uppercase text-orange-300">{preview.categoryName}</p>
              <p className="font-semibold">{preview.title}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
