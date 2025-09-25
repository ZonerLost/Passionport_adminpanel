import React, { useState } from "react";
import SectionCard from "../Components/ui/common/SectionCard";

// Ledger
import LedgerFiltersBar from "../Components/finance/ledger/LedgerFiltersBar";
import TransactionsTable from "../Components/finance/ledger/TransactionsTable";
import TransactionDrawer from "../Components/finance/ledger/TransactionDrawer";

// Payouts
import PayoutsFiltersBar from "../Components/finance/payouts/PayoutsFiltersBar";
import PayoutsTable from "../Components/finance/payouts/PayoutsTable";
import PayoutDetailDrawer from "../Components/finance/payouts/PayoutDetailDrawer";

// Disputes
import DisputesFiltersBar from "../Components/finance/disputes/DisputesFiltersBar";
import DisputesTable from "../Components/finance/disputes/DisputesTable";
import DisputeDetailDrawer from "../Components/finance/disputes/DisputeDetailDrawer";

// Fees & Taxes
import FeesConfig from "../Components/finance/fees/FeesConfig";
import TaxRulesTable from "../Components/finance/fees/TaxRulesTable";
import InvoiceSettings from "../Components/finance/fees/InvoiceSettings";

// Hooks
import useLedger from "../hooks/useLedger";
import usePayouts from "../hooks/usePayouts";
import useDisputes from "../hooks/useDisputes";
import useFeesTaxes from "../hooks/useFeesTaxes";

export default function PaymentsPayoutsFinance() {
  const [tab, setTab] = useState("ledger");

  const ledger = useLedger();
  const payouts = usePayouts();
  const disputes = useDisputes();
  const ft = useFeesTaxes();

  return (
    <div className="p-4 md:p-6 space-y-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        {[
          ["ledger", "Transactions Ledger"],
          ["payouts", "Payouts"],
          ["disputes", "Disputes & Chargebacks"],
          ["fees", "Fees & Taxes"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`h-9 px-3 rounded-lg border ${
              tab === key ? "text-white" : "text-slate-300"
            }`}
            style={{
              borderColor: "rgba(110,86,207,0.25)",
              background: tab === key ? "#0F1118" : "transparent",
            }}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Ledger */}
      {tab === "ledger" && (
        <SectionCard
          title="Transactions Ledger"
          action={
            <LedgerFiltersBar
              filters={ledger.filters}
              onSearch={ledger.actions.setQuery}
              onMethod={ledger.actions.setMethod}
              onType={ledger.actions.setType}
              onStatus={ledger.actions.setStatus}
              onExport={ledger.actions.exportCSV}
            />
          }
        >
          {ledger.loading ? (
            <Skeleton h={200} />
          ) : (
            <TransactionsTable
              data={ledger}
              onPage={ledger.actions.setPage}
              onOpen={ledger.actions.open}
              onRefund={ledger.actions.refund}
            />
          )}
          <TransactionDrawer
            open={!!ledger.selected}
            txn={ledger.selected}
            onClose={ledger.actions.close}
          />
        </SectionCard>
      )}

      {/* Payouts */}
      {tab === "payouts" && (
        <SectionCard
          title="Brand Payouts"
          action={
            <PayoutsFiltersBar
              filters={payouts.filters}
              onSearch={payouts.actions.setQuery}
              onKyc={payouts.actions.setKyc}
              onExport={payouts.actions.exportCSV}
            />
          }
        >
          {payouts.loading ? (
            <Skeleton h={200} />
          ) : (
            <PayoutsTable
              data={payouts}
              onPage={payouts.actions.setPage}
              onOpen={payouts.actions.open}
            />
          )}
          <PayoutDetailDrawer
            open={!!payouts.selected}
            payout={payouts.selected}
            onClose={payouts.actions.close}
            onHold={payouts.actions.hold}
            onRelease={payouts.actions.release}
            onSchedule={payouts.actions.schedule}
          />
        </SectionCard>
      )}

      {/* Disputes */}
      {tab === "disputes" && (
        <SectionCard
          title="Disputes & Chargebacks"
          action={
            <DisputesFiltersBar
              filters={disputes.filters}
              onSearch={disputes.actions.setQuery}
              onStatus={disputes.actions.setStatus}
              onExport={disputes.actions.exportCSV}
            />
          }
        >
          {disputes.loading ? (
            <Skeleton h={200} />
          ) : (
            <DisputesTable
              data={disputes}
              onPage={disputes.actions.setPage}
              onOpen={disputes.actions.open}
            />
          )}
          <DisputeDetailDrawer
            open={!!disputes.selected}
            dispute={disputes.selected}
            onClose={disputes.actions.close}
            onEvidence={disputes.actions.evidence}
            onCloseCase={disputes.actions.close}
          />
        </SectionCard>
      )}

      {/* Fees & Taxes */}
      {tab === "fees" && (
        <>
          <SectionCard title="Platform Fees & Rules">
            {ft.loading ? (
              <Skeleton h={160} />
            ) : (
              <FeesConfig
                rows={ft.fees}
                onSave={ft.actions.saveFee}
                onDelete={ft.actions.deleteFee}
              />
            )}
          </SectionCard>
          <SectionCard title="Tax/VAT Rules by Region">
            {ft.loading ? (
              <Skeleton h={160} />
            ) : (
              <TaxRulesTable
                rows={ft.taxes}
                onSave={ft.actions.saveTax}
                onDelete={ft.actions.deleteTax}
              />
            )}
          </SectionCard>
          <SectionCard title="Invoice Settings">
            {ft.loading ? (
              <Skeleton h={120} />
            ) : (
              <InvoiceSettings
                settings={ft.invoice}
                onSave={ft.actions.saveInvoice}
              />
            )}
          </SectionCard>
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
