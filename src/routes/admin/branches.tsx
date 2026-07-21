import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash2, Plus, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Branch } from "@/types";

export const Route = createFileRoute("/admin/branches")({
  component: AdminBranches,
});

function AdminBranches() {
  const queryClient = useQueryClient();
  const { data: branches = [], isLoading } = useQuery({
    queryKey: ["adminBranches"],
    queryFn: api.getBranches,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);

  // Form State
  const [formData, setFormData] = useState({ name: "", address: "", phone: "", is_active: true });

  const resetForm = () => {
    setFormData({ name: "", address: "", phone: "", is_active: true });
    setEditingBranch(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name || "",
      address: branch.address || "",
      phone: branch.phone || "",
      is_active: branch.is_active ?? true,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (branch: Branch) => {
    setDeletingBranch(branch);
    setIsDeleteOpen(true);
  };

  // Mutations
  const createMut = useMutation({
    mutationFn: api.createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBranches"] });
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["activeBranches"] });
      toast.success("تمت إضافة الفرع بنجاح");
      setIsFormOpen(false);
    },
    onError: (err: any) => toast.error(err.message || "حدث خطأ"),
  });

  const updateMut = useMutation({
    mutationFn: (data: Partial<Branch>) => api.updateBranch(editingBranch!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBranches"] });
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["activeBranches"] });
      toast.success("تم تحديث الفرع بنجاح");
      setIsFormOpen(false);
    },
    onError: (err: any) => toast.error(err.message || "حدث خطأ"),
  });

  const deleteMut = useMutation({
    mutationFn: api.deleteBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminBranches"] });
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      queryClient.invalidateQueries({ queryKey: ["activeBranches"] });
      toast.success("تم حذف الفرع بنجاح");
      setIsDeleteOpen(false);
    },
    onError: (err: any) => toast.error(err.message || "حدث خطأ"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.address) {
      toast.error("الاسم والعنوان مطلوبان");
      return;
    }
    if (editingBranch) {
      updateMut.mutate(formData);
    } else {
      createMut.mutate(formData);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 lg:p-8 shadow-sm ring-1 ring-black/5 min-h-[400px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold text-ink">إدارة الفروع</h2>
        <Button onClick={handleOpenCreate} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          إضافة فرع
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">جاري التحميل...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">الاسم</TableHead>
                <TableHead className="text-right">العنوان</TableHead>
                <TableHead className="text-right">الهاتف</TableHead>
                <TableHead className="text-right">الحالة</TableHead>
                <TableHead className="text-right">إجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {branches.map((branch: Branch) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell dir="ltr" className="text-right">{branch.phone || "—"}</TableCell>
                <TableCell>
                  {branch.is_active ? (
                    <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-medium">
                      <Check className="w-3 h-3" /> نشط
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-md text-xs font-medium">
                      <X className="w-3 h-3" /> غير نشط
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenEdit(branch)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleOpenDelete(branch)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {branches.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-4">
                  لا توجد فروع بعد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>{editingBranch ? "تعديل الفرع" : "إضافة فرع جديد"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم الفرع *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="مثال: فرع المهندسين"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="مثال: شارع جامعة الدول..."
              />
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                className="w-4 h-4 text-crimson focus:ring-crimson rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer">الفرع متاح للطلبات</Label>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={createMut.isPending || updateMut.isPending}>
                {createMut.isPending || updateMut.isPending ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Alert */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من الحذف؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف الفرع "{deletingBranch?.name}" بشكل نهائي. تأكد من أنه لا توجد طلبات مرتبطة به لتجنب الأخطاء، أو قم بتعطيله بدلاً من الحذف.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteMut.mutate(deletingBranch?.id as string)}
            >
              {deleteMut.isPending ? "جاري الحذف..." : "حذف"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
