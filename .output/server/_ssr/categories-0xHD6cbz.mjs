import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as api } from "./api-BzRK7CvT.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as Pen, l as Plus, r as Trash2 } from "../_libs/lucide-react.mjs";
import { _ as TableCell, a as AlertDialogDescription, b as TableRow, c as AlertDialogTitle, d as DialogContent, f as DialogFooter, g as TableBody, h as Table, i as AlertDialogContent, l as Button, m as DialogTitle, n as AlertDialogAction, o as AlertDialogFooter, p as DialogHeader, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Dialog, v as TableHead, y as TableHeader } from "./table-VmAK4RwT.mjs";
import { n as Label, t as Input } from "./label-Dj5RX0vT.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-0xHD6cbz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminCategories() {
	const queryClient = useQueryClient();
	const { data: categories = [], isLoading } = useQuery({
		queryKey: ["adminCategories"],
		queryFn: api.getCategories
	});
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [editingCat, setEditingCat] = (0, import_react.useState)(null);
	const [deletingCat, setDeletingCat] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		slug: "",
		image_url: "",
		sort_order: 0
	});
	const resetForm = () => {
		setFormData({
			name: "",
			slug: "",
			image_url: "",
			sort_order: 0
		});
		setEditingCat(null);
	};
	const handleOpenCreate = () => {
		resetForm();
		setIsFormOpen(true);
	};
	const handleOpenEdit = (cat) => {
		setEditingCat(cat);
		setFormData({
			name: cat.name || "",
			slug: cat.slug || "",
			image_url: cat.image_url || "",
			sort_order: cat.sort_order || 0
		});
		setIsFormOpen(true);
	};
	const handleOpenDelete = (cat) => {
		setDeletingCat(cat);
		setIsDeleteOpen(true);
	};
	const createMut = useMutation({
		mutationFn: api.createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
			toast.success("تمت إضافة الفئة بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const updateMut = useMutation({
		mutationFn: (data) => api.updateCategory(editingCat.id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
			toast.success("تم تحديث الفئة بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const deleteMut = useMutation({
		mutationFn: api.deleteCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminCategories"] });
			toast.success("تم حذف الفئة بنجاح");
			setIsDeleteOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.name) {
			toast.error("الاسم مطلوب");
			return;
		}
		if (editingCat) updateMut.mutate(formData);
		else {
			const newSlug = Date.now().toString();
			createMut.mutate({
				...formData,
				slug: newSlug
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-3xl p-4 lg:p-8 shadow-sm ring-1 ring-black/5 min-h-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl lg:text-2xl font-semibold text-ink",
					children: "إدارة الفئات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenCreate,
					className: "gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "إضافة فئة"]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10",
				children: "جاري التحميل..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "الصورة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "الاسم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "الترتيب"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "إجراءات"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: cat.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cat.image_url,
						alt: cat.name,
						className: "w-12 h-12 object-cover rounded"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs",
						children: "بدون صورة"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: cat.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: cat.sort_order }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "icon",
							onClick: () => handleOpenEdit(cat),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "destructive",
							size: "icon",
							onClick: () => handleOpenDelete(cat),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
						})]
					}) })
				] }, cat.id)), categories.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 5,
					className: "text-center text-gray-500 py-4",
					children: "لا توجد فئات بعد."
				}) })] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					dir: "rtl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingCat ? "تعديل الفئة" : "إضافة فئة جديدة" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "اسم الفئة *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: formData.name,
									onChange: (e) => setFormData({
										...formData,
										name: e.target.value
									}),
									placeholder: "مثال: بيتزا"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "image_url",
									children: "رابط الصورة (Image URL)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "image_url",
									value: formData.image_url,
									onChange: (e) => setFormData({
										...formData,
										image_url: e.target.value
									}),
									placeholder: "https://...",
									dir: "ltr",
									className: "text-left"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sort_order",
									children: "الترتيب"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sort_order",
									type: "number",
									value: formData.sort_order,
									onChange: (e) => setFormData({
										...formData,
										sort_order: parseInt(e.target.value) || 0
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: createMut.isPending || updateMut.isPending,
								children: createMut.isPending || updateMut.isPending ? "جاري الحفظ..." : "حفظ"
							}) })
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: isDeleteOpen,
				onOpenChange: setIsDeleteOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					dir: "rtl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "هل أنت متأكد من الحذف؟" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
						"سيتم حذف الفئة \"",
						deletingCat?.name,
						"\" بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "إلغاء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						className: "bg-red-600 hover:bg-red-700",
						onClick: () => deleteMut.mutate(deletingCat?.id),
						children: deleteMut.isPending ? "جاري الحذف..." : "حذف"
					})] })]
				})
			})
		]
	});
}
//#endregion
export { AdminCategories as component };
