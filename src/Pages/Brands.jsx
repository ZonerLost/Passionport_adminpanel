import React from "react";
import SectionCard from "../Components/ui/common/SectionCard";
import BrandsTable from "../Components/brands/BrandsTable";
import BrandDetailDrawer from "../Components/brands/BrandDetailDrawer";
import useBrands from "../hooks/useBrands";
import { useState } from "react";

export default function Brands() {
  const brands = useBrands();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);

  async function handleOpen(id) {
    const detail = await brands.actions?.open(id);
    setDrawerData(detail);
    setDrawerOpen(true);
  }

  async function handleApprove() {
    if (!drawerData?.brand?.id) return;
    await brands.actions?.approve(drawerData.brand.id);
    const refreshed = await brands.actions?.open(drawerData.brand.id);
    setDrawerData(refreshed);
  }

  async function handleReject() {
    if (!drawerData?.brand?.id) return;
    await brands.actions?.reject(drawerData.brand.id, "Rejected via UI");
    const refreshed = await brands.actions?.open(drawerData.brand.id);
    setDrawerData(refreshed);
  }

  async function handleSuspend() {
    if (!drawerData?.brand?.id) return;
    await brands.actions?.suspend(drawerData.brand.id, 7);
    const refreshed = await brands.actions?.open(drawerData.brand.id);
    setDrawerData(refreshed);
  }

  async function handleAddCampaign() {
    if (!drawerData?.brand?.id) return;
    await brands.actions?.addCampaign(drawerData.brand.id, {
      title: "New Campaign",
    });
    const refreshed = await brands.actions?.open(drawerData.brand.id);
    setDrawerData(refreshed);
  }

  async function handleRemoveCampaign(cid) {
    if (!drawerData?.brand?.id) return;
    await brands.actions?.removeCampaign(drawerData.brand.id, cid);
    const refreshed = await brands.actions?.open(drawerData.brand.id);
    setDrawerData(refreshed);
  }

  return (
    <div className="p-4 md:p-6 space-y-4">
      <SectionCard title="Brands">
        {brands.loading ? (
          <div className="h-40 rounded-xl animate-pulse" />
        ) : (
          <BrandsTable
            rows={brands.rows || []}
            onPage={brands.actions?.setPage}
            onOpen={handleOpen}
          />
        )}
      </SectionCard>

      <BrandDetailDrawer
        open={drawerOpen}
        data={drawerData}
        onClose={() => setDrawerOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        onSuspend={handleSuspend}
        onAddCampaign={handleAddCampaign}
        onRemoveCampaign={handleRemoveCampaign}
      />
    </div>
  );
}
