import { r as __toESM } from "../_runtime.mjs";
import { A as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as api } from "./api-DKOcXFly.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { d as Plus, p as Pen, r as Trash2 } from "../_libs/lucide-react.mjs";
import { t as cn } from "./utils-NLkIIbLX.mjs";
import { _ as TableCell, a as AlertDialogDescription, b as TableRow, c as AlertDialogTitle, d as DialogContent, f as DialogFooter, g as TableBody, h as Table, i as AlertDialogContent, l as Button, m as DialogTitle, n as AlertDialogAction, o as AlertDialogFooter, p as DialogHeader, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog, u as Dialog, v as TableHead, y as TableHeader } from "./table-VmAK4RwT.mjs";
import { n as Label, t as Input } from "./label-Dj5RX0vT.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BLja6ahP.mjs";
import { n as Thumb, t as Root } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offers-BOZHKomm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Root.displayName;
var NO_PRODUCT = "__none__";
function AdminOffers() {
	const queryClient = useQueryClient();
	const { data: offers = [], isLoading } = useQuery({
		queryKey: ["adminOffers"],
		queryFn: api.getAdminOffers
	});
	const { data: products = [] } = useQuery({
		queryKey: ["adminProducts"],
		queryFn: api.getAdminProducts
	});
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [isDeleteOpen, setIsDeleteOpen] = (0, import_react.useState)(false);
	const [editingOffer, setEditingOffer] = (0, import_react.useState)(null);
	const [deletingOffer, setDeletingOffer] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		title: "",
		description: "",
		image_url: "",
		discount_type: "fixed",
		discount_value: "",
		is_active: true,
		product_id: "",
		old_price: "",
		new_price: "",
		expires_in: "",
		savings: ""
	});
	const resetForm = () => {
		setFormData({
			title: "",
			description: "",
			image_url: "",
			discount_type: "fixed",
			discount_value: "",
			is_active: true,
			product_id: "",
			old_price: "",
			new_price: "",
			expires_in: "",
			savings: ""
		});
		setEditingOffer(null);
	};
	const handleOpenCreate = () => {
		resetForm();
		setIsFormOpen(true);
	};
	const handleOpenEdit = (offer) => {
		setEditingOffer(offer);
		setFormData({
			title: offer.title || "",
			description: offer.description || "",
			image_url: offer.image_url || "",
			discount_type: offer.discount_type || "fixed",
			discount_value: offer.discount_value?.toString() || "",
			is_active: offer.is_active ?? true,
			product_id: offer.product_id || "",
			old_price: offer.old_price?.toString() || "",
			new_price: offer.new_price?.toString() || "",
			expires_in: offer.expires_in || "",
			savings: offer.savings || ""
		});
		setIsFormOpen(true);
	};
	const handleOpenDelete = (offer) => {
		setDeletingOffer(offer);
		setIsDeleteOpen(true);
	};
	const createMut = useMutation({
		mutationFn: api.createOffer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
			toast.success("تمت إضافة العرض بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const updateMut = useMutation({
		mutationFn: (data) => api.updateOffer(editingOffer.id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
			toast.success("تم تحديث العرض بنجاح");
			setIsFormOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const deleteMut = useMutation({
		mutationFn: api.deleteOffer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["adminOffers"] });
			toast.success("تم حذف العرض بنجاح");
			setIsDeleteOpen(false);
		},
		onError: (err) => toast.error(err.message || "حدث خطأ")
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.title) {
			toast.error("اسم العرض مطلوب");
			return;
		}
		if (!formData.new_price) {
			toast.error("السعر الجديد مطلوب");
			return;
		}
		const submitData = {
			title: formData.title,
			description: formData.description || null,
			image_url: formData.image_url || null,
			discount_type: formData.discount_type,
			discount_value: formData.discount_value ? parseFloat(formData.discount_value) : null,
			is_active: formData.is_active,
			product_id: formData.product_id ? formData.product_id : null,
			old_price: formData.old_price ? parseFloat(formData.old_price) : null,
			new_price: formData.new_price ? parseFloat(formData.new_price) : null,
			expires_in: formData.expires_in || null,
			savings: formData.savings || null
		};
		if (editingOffer) updateMut.mutate(submitData);
		else createMut.mutate(submitData);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-3xl p-4 lg:p-8 shadow-sm ring-1 ring-black/5 min-h-[400px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl lg:text-2xl font-semibold text-ink",
					children: "إدارة العروض"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleOpenCreate,
					className: "gap-2 w-full sm:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), "إضافة عرض"]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						children: "اسم العرض"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "السعر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الخصم"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "المنتج"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "الحالة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right whitespace-nowrap",
						children: "إجراءات"
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [offers.map((offer) => {
					const linkedProduct = products.find((p) => p.id === offer.product_id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: offer.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: offer.image_url,
							alt: offer.title,
							className: "w-12 h-12 object-cover rounded"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs",
							children: "بدون صورة"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "font-medium",
							children: offer.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: offer.new_price != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: [offer.new_price, " ج.م"]
							}), offer.old_price != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-gray-400 line-through",
								children: [offer.old_price, " ج.م"]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gray-400 text-xs",
							children: "—"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: offer.discount_value != null ? `${offer.discount_value} ${offer.discount_type === "percentage" ? "%" : "ج.م"}` : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "text-xs",
							children: linkedProduct ? linkedProduct.name : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gray-400",
								children: "غير مرتبط"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `px-2 py-1 rounded-full text-xs ${offer.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`,
							children: offer.is_active ? "نشط" : "غير نشط"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								onClick: () => handleOpenEdit(offer),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "destructive",
								size: "icon",
								onClick: () => handleOpenDelete(offer),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4" })
							})]
						}) })
					] }, offer.id);
				}), offers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 7,
					className: "text-center text-gray-500 py-4",
					children: "لا توجد عروض بعد."
				}) })] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					dir: "rtl",
					className: "max-h-[90vh] overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingOffer ? "تعديل العرض" : "إضافة عرض جديد" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "title",
									children: "اسم العرض *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "title",
									value: formData.title,
									onChange: (e) => setFormData({
										...formData,
										title: e.target.value
									}),
									placeholder: "مثال: عرض التوفير"
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
									})
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
									dir: "ltr",
									className: "text-left"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "المنتج المرتبط" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: formData.product_id || NO_PRODUCT,
										onValueChange: (v) => setFormData({
											...formData,
											product_id: v === NO_PRODUCT ? "" : v
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "اختر منتجاً (اختياري)" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: NO_PRODUCT,
											children: "بدون ربط"
										}), products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: p.id,
											children: p.name
										}, p.id))] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-gray-500",
										children: "إذا لم تختر منتجاً فلن يفتح المستخدم صفحة المنتج من العرض."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "old_price",
										children: "السعر قبل الخصم"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "old_price",
										type: "number",
										step: "0.01",
										value: formData.old_price,
										onChange: (e) => setFormData({
											...formData,
											old_price: e.target.value
										}),
										placeholder: "اختياري"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "new_price",
										children: "السعر بعد الخصم *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "new_price",
										type: "number",
										step: "0.01",
										value: formData.new_price,
										onChange: (e) => setFormData({
											...formData,
											new_price: e.target.value
										}),
										placeholder: "السعر النهائي المعروض"
									})]
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "percentage",
											children: "نسبة مئوية (%)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "fixed",
											children: "مبلغ ثابت"
										})] })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "expires_in",
										children: "مدة الانتهاء"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "expires_in",
										value: formData.expires_in,
										onChange: (e) => setFormData({
											...formData,
											expires_in: e.target.value
										}),
										placeholder: "مثال: ينتهي خلال 3 أيام"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "savings",
										children: "نص التوفير"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "savings",
										value: formData.savings,
										onChange: (e) => setFormData({
											...formData,
											savings: e.target.value
										}),
										placeholder: "مثال: وفّر 20 ج.م"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-md border p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "is_active",
									className: "cursor-pointer",
									children: "العرض نشط"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "is_active",
									checked: formData.is_active,
									onCheckedChange: (v) => setFormData({
										...formData,
										is_active: v
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
						"سيتم حذف العرض \"",
						deletingOffer?.title,
						"\" بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "إلغاء" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						className: "bg-red-600 hover:bg-red-700",
						onClick: () => deleteMut.mutate(deletingOffer?.id),
						children: deleteMut.isPending ? "جاري الحذف..." : "حذف"
					})] })]
				})
			})
		]
	});
}
//#endregion
export { AdminOffers as component };
