/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-02 16:59:04
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-04 20:42:15
 * @FilePath: \my-100\src\app\002\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'

function SearchBar() {
  return (
    <form action="">
      <input className="block border-2 rounded-sm" type="text" placeholder="Search..." />
      <label htmlFor="">
        <input type="checkbox" />
        <span>Only show products in stock</span>
      </label>
    </form>
  )
}

function ProductItemRow({ product }: { product: ProductItem }) {
  const isLast = product.name === PRODUCTS[PRODUCTS.length - 1].name ||
    product.name === PRODUCTS[2].name
  const computedNameClass = `${isLast ? 'text-red-600 pb-10' : ''}`
  const computedPriceClass = `${isLast ? 'pb-10' : ''}`

  return (
    <tr>
      <td className={computedNameClass}>{product.name}</td>
      <td className={computedPriceClass}>{product.price}</td>
    </tr>
  )
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <td colSpan={2} className="font-bold pl-8 pt-8">
        {category}
      </td>
    </tr>
  )
}

function ProductTable({ products }: { products: ProductItem[] }) {
  const rows: any[] = []
  let lastCategoryName: string | null = null

  products.map((product) => {
    if (product.category !== lastCategoryName) {
      rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
    }
    rows.push(<ProductItemRow product={product} key={product.name} />)
    lastCategoryName = product.category
  })

  return (
    <table className="mt-5">
      <thead >
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

type ProductItem = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

function FilterTableProductTable({ products }: { products: ProductItem[] }) {
  return (
    <div className="w-400px m-auto bg-white rounded-xl p-10">
      <SearchBar />
      <ProductTable products={products} />
    </div>

  )
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterTableProductTable products={PRODUCTS} />
}
