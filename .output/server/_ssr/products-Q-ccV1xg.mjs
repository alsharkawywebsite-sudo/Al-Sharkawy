import { n as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as api } from "./api-BzRK7CvT.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as Pen, l as Plus, r as Trash2, t as X } from "../_libs/lucide-react.mjs";
import { _ as TableCell, a as AlertDialogDescription, b as TableRow, c as AlertDialogTitle, d as DialogContent, f as DialogFooter, g as TableBody, h as Table, i as AlertDialogContent, l as Button, m as DialogTitle, n as AlertDialogAction, o as AlertDialogFooter, p as DialogHeader, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Dialog, v as TableHead, y as TableHeader } from "./table-VmAK4RwT.mjs";
import { n as Label, t as Input } from "./label-Dj5RX0vT.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BLja6ahP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Q-ccV1xg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminProducts() {
	const queryClient = useQueryClient();
	const { data: products = [], isLoading: isLoadingProducts } = useQuery({
		queryKey: ["adminProducts"],
		queryFn: api.getAdminProducts
	});
	const { data: categories = [] } = useQuery({
		queryKey: ["adminCategories"],
		queryFn: api.getCategories
	});
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [editingProd, setEditingProd] = (0, import_react.useState)(null);
	const [deletingProd, setDeletingProd] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		name: "",
		description: "",
		category_id: "",
		image_url: "",
		base_price: "",
		discount_type: "none",
		discount_value: "",
		is_active: true
	});
	const [sizes, setSizes] = (0, import_react.useState)([]);
	const resetForm = () => {
		setFormData({
			name: "",
			description: "",
			category_id: "",
			image_url: "",
			base_price: "",
			discount_type: "none",
			discount_value: "",
			is_active: true
		});
		setSizes([]);
		setEditingProd(null);
	};
	const handleOpenCreate = () => {
		resetForm();
		setIsFormOpen(true);
	};
	const handleOpenEdit = (prod) => {
		setEditingProd(prod);
		setFormData({
			name: prod.name || "",
			description: prod.description || "",
			category_id: prod.category_id || "",
			image_url: prod.image_url || "",
			base_price: prod.base_price?.toString() || "",
			discount_type: prod.discount_type || "none",
			discount_value: prod.discount_value?.toString() || "",
			is_active: prod.is_active ?? true
		});
		setSizes(prod.product_sizes || []);
		setIsFormOpen(true);
	};
	const handleOpenDelete = (prod) => {
		setDeletingProd(prod);
		setIsDeleteOpen(true);
	};
	const addSize = () => {
		setSizes([...sizes, {
			name: "",
			price: "",
			is_active: true
		}]);
	};
	const updateSize = (index, field, value) => {
		const newSizes = [...sizes];
		newSizes[index] = {
			...newSizes[index],
			[field]: value
		};
		setSizes(newSizes);
	};
	const removeSize = (index) => {
		setSizes(sizes.filter((_, i) => i !== index));
	};
	const createMut = useMutation({
		mutationFn: (data) => api.createProduct(data.prod, data.sizes),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
			toast.success("تمت إضافة المنتج بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const updateMut = useMutation({
		mutationFn: (data) => api.updateProduct(editingProd.id, data.prod, data.sizes),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
			toast.success("تم تحديث المنتج بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const deleteMut = useMutation({
		mutationFn: api.deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
			toast.success("تم حذف المنتج بنجاح");
			setIsDeleteOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.name || !formData.category_id) {
			toast.error("الاسم والفئة مطلوبان");
			return;
		}
		if (sizes.length === 0 && !formData.base_price) {
			toast.error("يجب إدخال السعر الأساسي أو إضافة أحجام وأسعار");
			return;
		}
		if (sizes.length > 0) {
			if (sizes.find((s) => !s.name || !s.price)) {
				toast.error("يرجى إكمال جميع بيانات الأحجام");
				return;
			}
		}
		const submitData = {
			...formData,
			base_price: sizes.length > 0 ? null : parseFloat(formData.base_price) || null,
			discount_value: formData.discount_value ? parseFloat(formData.discount_value) : null
		};
		const submitSizes = sizes.map((s) => ({
			name: s.name,
			price: parseFloat(s.price),
			is_active: s.is_active ?? true
		}));
		if (editingProd) updateMut.mutate({
			prod: submitData,
			sizes: submitSizes
		});
		else createMut.mutate({
			prod: submitData,
			sizes: submitSizes
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-3xl p-4 lg:p-8 shadow-sm ring-1 ring-black/5 min-h-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl lg:text-2xl font-semibold text-ink",
					children: "إدارة المنتجات"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenCreate,
					className: "gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "إضافة منتج"]
				})]
			}),
			isLoadingProducts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10",
				children: "جاري التحميل..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الصورة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الاسم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الفئة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "السعر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الحالة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "إجراءات"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [products.map((prod) => {
					const cat = categories.find((c) => c.id === prod.category_id);
					const hasSizes = prod.product_sizes && prod.product_sizes.length > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: prod.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: prod.image_url,
							alt: prod.name,
							className: "w-12 h-12 object-cover rounded"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs",
							children: "بدون صورة"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: prod.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: cat?.name || "غير محدد" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: hasSizes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-gray-500",
							children: "متعدد الأحجام"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [prod.base_price, " ج.م"]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-2 py-1 rounded-full text-xs ${prod.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`,
							children: prod.is_active ? "نشط" : "غير نشط"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								onClick: () => handleOpenEdit(prod),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								size: "icon",
								onClick: () => handleOpenDelete(prod),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						}) })
					] }, prod.id);
				}), products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 6,
					className: "text-center text-gray-500 py-4",
					children: "لا توجد منتجات بعد."
				}) })] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					dir: "rtl",
					className: "max-w-2xl max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingProd ? "تعديل المنتج" : "إضافة منتج جديد" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-6 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "اسم المنتج *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: formData.name,
										onChange: (e) => setFormData({
											...formData,
											name: e.target.value
										}),
										placeholder: "مثال: بيتزا مارجريتا"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "الفئة *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: formData.category_id,
										onValueChange: (v) => setFormData({
											...formData,
											category_id: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر الفئة" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: c.id,
											children: c.name
										}, c.id)) })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "description",
									children: "الوصف"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "description",
									value: formData.description,
									onChange: (e) => setFormData({
										...formData,
										description: e.target.value
									}),
									placeholder: "مكونات أو وصف للمنتج"
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
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "نوع الخصم" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: formData.discount_type,
										onValueChange: (v) => setFormData({
											...formData,
											discount_type: v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "none",
												children: "بدون خصم"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "percentage",
												children: "نسبة مئوية (%)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "fixed",
												children: "مبلغ ثابت"
											})
										] })]
									})]
								}), formData.discount_type !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "discount_value",
										children: "قيمة الخصم"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "discount_value",
										type: "number",
										step: "0.01",
										value: formData.discount_value,
										onChange: (e) => setFormData({
											...formData,
											discount_value: e.target.value
										})
									})]
								})]
							}),
							formData.discount_type !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 bg-gray-50 border border-gray-100 rounded-lg flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold text-gray-700",
										children: "معاينة السعر بعد الخصم"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gray-500",
										children: "يقوم النظام بتقريب السعر النهائي ليكون بدون كسور لتسهيل الحساب (مثلاً: 14.5 تصبح 15)."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-sm",
										children: (() => {
											const base = sizes.length > 0 ? parseFloat(sizes[0].price || "0") : parseFloat(formData.base_price || "0");
											if (isNaN(base) || base <= 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500",
												children: "أدخل السعر الأساسي أو سعر الحجم الأول للمعاينة."
											});
											const val = parseFloat(formData.discount_value || "0");
											const type = formData.discount_type;
											const final = Math.round(Math.max(0, type === "percentage" ? base - base * val / 100 : base - val));
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-4 items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["السعر الأصلي: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "line-through text-gray-400",
													children: [base, " ج.م"]
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-bold text-green-600",
													children: [
														"السعر النهائي بعد التقريب: ",
														final,
														" ج.م"
													]
												})]
											});
										})()
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-semibold",
											children: "السعر والأحجام"
										})
									}),
									sizes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "base_price",
											children: "السعر الأساسي (ج.م) *"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "base_price",
											type: "number",
											step: "0.01",
											value: formData.base_price,
											onChange: (e) => setFormData({
												...formData,
												base_price: e.target.value
											}),
											placeholder: "مثال: 120"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-3 bg-blue-50 text-blue-700 text-sm rounded-md mb-2",
												children: "سيتم تجاهل السعر الأساسي لأن هذا المنتج يحتوي على أحجام."
											}),
											sizes.map((size, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-2 items-end",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-xs",
															children: "اسم الحجم (مثال: وسط)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															value: size.name,
															onChange: (e) => updateSize(index, "name", e.target.value)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "w-32 space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															className: "text-xs",
															children: "السعر (ج.م)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															type: "number",
															step: "0.01",
															value: size.price,
															onChange: (e) => updateSize(index, "price", e.target.value)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														type: "button",
														onClick: () => removeSize(index),
														className: "text-red-500",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
													})
												]
											}, index)),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "button",
												variant: "outline",
												size: "sm",
												onClick: addSize,
												className: "gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " إضافة حجم"]
											})
										]
									})
								]
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
						"سيتم حذف المنتج \"",
						deletingProd?.name,
						"\" بشكل نهائي مع كافة أحجامه. هذا الإجراء لا يمكن التراجع عنه."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "إلغاء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						className: "bg-red-600 hover:bg-red-700",
						onClick: () => deleteMut.mutate(deletingProd?.id),
						children: deleteMut.isPending ? "جاري الحذف..." : "حذف"
					})] })]
				})
			})
		]
	});
}
//#endregion
export { AdminProducts as component };
