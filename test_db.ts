import { getMenuItems } from "./src/services/api.ts";
async function main() {
  const items = await getMenuItems();
  console.log(items.slice(0, 2).map(p => ({
    id: p.id,
    discount_type: p.discount_type,
    discount_value: p.discount_value,
  })));
}
main();
