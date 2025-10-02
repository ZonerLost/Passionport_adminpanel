import React, { useState } from "react";

// Shared + local components
import SectionCard from "../Components/ui/common/SectionCard";
import ProductFiltersBar from "../Components/catalog/catalog/ProductFiltersBar";
import ProductTable from "../Components/catalog/catalog/ProductTable";
import ProductDetailDrawer from "../Components/catalog/catalog/ProductDetailDrawer";
import BulkEditor from "../Components/catalog/catalog/BulkEditor";

import OrdersFiltersBar from "../Components/catalog/orders/OrdersFiltersBar";
import OrdersTable from "../Components/catalog/orders/OrdersTable";
import OrderDetailDrawer from "../Components/catalog/orders/OrderDetailDrawer";

import DiscountsTable from "../Components/catalog/discounts/DiscountsTable";
import PerksEditor from "../Components/catalog/discounts/PerksEditor";

// Hooks
import useCatalog from "../hooks/useCatalog";
import useOrders from "../hooks/useOrders";
import useDiscounts from "../hooks/useDiscounts";

export default function ProductsOrdersCatalog() {
  const [tab, setTab] = useState("catalog");

  const catalog = useCatalog();
  const orders = useOrders();
  const discounts = useDiscounts();

  const [bulkOpen, setBulkOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <div className="p-4 md:p-6 space-y-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {[
          ["catalog", "Product Catalog"],
          ["orders", "Orders & Fulfillment"],
          ["discounts", "Discounts & Perks"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`h-9 px-3 rounded-lg border ${
              tab === key ? "text-white" : "text-slate-300"
            }`}
            style={{
              borderColor: "rgba(255,122,0,0.25)",
              background: tab === key ? "#0F1118" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Product Catalog */}
      {tab === "catalog" && (
        <SectionCard
          title="Product Catalog"
          action={
            <ProductFiltersBar
              filters={catalog.filters}
              brands={catalog.brands}
              onSearch={catalog.actions.setQuery}
              onBrand={catalog.actions.setBrand}
              onStatus={catalog.actions.setStatus}
              onLinked={catalog.actions.setLinked}
              onExport={catalog.actions.exportCSV}
              onBulk={() => setBulkOpen(true)}
            />
          }
        >
          {catalog.loading ? (
            <Skeleton h={200} />
          ) : (
            <ProductTable
              data={catalog}
              onPage={catalog.actions.setPage}
              onOpen={catalog.actions.open}
              onApprove={catalog.actions.approve}
              onPause={catalog.actions.pause}
              onFreeze={(id) => catalog.actions.freeze(id, "policy-breach")}
              onSelectMany={(ids) => setSelectedIds(ids)}
            />
          )}
          <ProductDetailDrawer
            open={!!catalog.selected}
            product={catalog.selected}
            onClose={catalog.actions.close}
          />
          <BulkEditor
            open={bulkOpen}
            selectedIds={selectedIds}
            onApply={async (payload) => {
              await catalog.actions.bulk(payload, selectedIds);
              setBulkOpen(false);
            }}
            onClose={() => setBulkOpen(false)}
          />
        </SectionCard>
      )}

      {/* Orders & Fulfillment */}
      {tab === "orders" && (
        <SectionCard
          title="Orders & Fulfillment"
          action={
            <OrdersFiltersBar
              filters={orders.filters}
              onSearch={orders.actions.setQuery}
              onStatus={orders.actions.setStatus}
              onExport={orders.actions.exportCSV}
            />
          }
        >
          {orders.loading ? (
            <Skeleton h={200} />
          ) : (
            <OrdersTable
              data={orders}
              onPage={orders.actions.setPage}
              onOpen={orders.actions.open}
              onUpdateStatus={orders.actions.updateStatus}
            />
          )}
          <OrderDetailDrawer
            open={!!orders.selected}
            order={orders.selected}
            onClose={orders.actions.close}
            onRefundItem={orders.actions.refundItem}
            onMarkShipped={orders.actions.markShipped}
            onReship={orders.actions.reship}
            onContact={orders.actions.contact}
          />
        </SectionCard>
      )}

      {/* Discounts & Perks */}
      {tab === "discounts" && (
        <>
          <SectionCard title="Promo Codes">
            {discounts.loading ? (
              <Skeleton h={160} />
            ) : (
              <DiscountsTable
                rows={discounts.rows}
                brands={discounts.brands}
                onSave={discounts.actions.save}
                onRemove={discounts.actions.remove}
              />
            )}
          </SectionCard>
          <PerksEditor />
        </>
      )}
    </div>
  );
}

function Skeleton({ h = 140 }) {
  return (
    <div
      className="rounded-2xl animate-pulse"
      style={{
        height: h,
        background: "linear-gradient(90deg,#0e1016,#11131a,#0e1016)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
