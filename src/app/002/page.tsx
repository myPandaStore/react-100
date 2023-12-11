/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-02 16:59:04
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-11 09:39:00
 * @FilePath: \my-100\src\app\002\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
debugger
import { useState } from "react"

type SearchBarType = {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (filterText: string) => void
  onInStockOnlyChange: (inStockOnly: boolean) => void
}

function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }: SearchBarType) {
  return (
    <form action="">
      <input
        className="block border-2 rounded-sm"
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label htmlFor="">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={e => onInStockOnlyChange(e.target.checked)} />
        <span>Only show products in stock</span>
      </label>
    </form>
  )
}

function ProductItemRow({ product }: { product: ProductItem }) {
  const stockedClass = product.stocked ? 'text-red-500' : 'text-green-500'

  return (
    <tr>
      <td className={stockedClass}>{product.name}</td>
      <td >{product.price}</td>
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

type ProductTableType = {
  products: ProductItem[],
  filterText: string,
  inStockOnly: boolean
}
function ProductTable({ products, filterText, inStockOnly }: ProductTableType) {
  const rows: any[] = []
  let lastCategoryName: string | null = null

  products.map((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return
    }
    if (inStockOnly && !product.stocked) {
      return
    }
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
function FilterableProductTable({ products }: { products: ProductItem[] }) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div className="w-400px m-auto bg-white rounded-xl p-10">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
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
  return <FilterableProductTable products={PRODUCTS} />
}
