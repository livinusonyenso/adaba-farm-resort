"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function InvestmentPaymentDetails() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Track which account was copied
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (account: string) => {
    navigator.clipboard.writeText(account);
    setCopiedAccount(account);
    setTimeout(() => setCopiedAccount(null), 2000); // reset after 2s
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-card border border-border rounded-xl p-8 shadow-sm mb-12"
    >
      <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
        Investment Payment Details
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Sterling Bank */}
        <div className="text-center border border-border rounded-lg p-5 shadow-sm relative">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            BANK NAME
          </p>
          <h3 className="text-xl font-bold text-foreground mb-1">
            Sterling Bank
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            ACCOUNT NAME
          </p>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Kazfield Integrated Services
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            ACCOUNT NUMBER
          </p>

          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-mono font-bold text-foreground">
              0500876289
            </h3>
            <button
              onClick={() => handleCopy("0500876289")}
              className="text-xs flex items-center gap-1 bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/80 transition"
            >
              {copiedAccount === "0500876289" ? (
                <>
                  <FiCheck className="text-sm" /> Copied!
                </>
              ) : (
                <>
                  <FiCopy className="text-sm" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* FCMB (Naira) */}
        <div className="text-center border border-border rounded-lg p-5 shadow-sm relative">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            BANK NAME
          </p>
          <h3 className="text-xl font-bold text-foreground mb-1">FCMB</h3>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            ACCOUNT NAME
          </p>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Kazfield Integrated Services
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            ACCOUNT NUMBER
          </p>

          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-mono font-bold text-foreground">
              5626752011
            </h3>
            <button
              onClick={() => handleCopy("5626752011")}
              className="text-xs flex items-center gap-1 bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/80 transition"
            >
              {copiedAccount === "5626752011" ? (
                <>
                  <FiCheck className="text-sm" /> Copied!
                </>
              ) : (
                <>
                  <FiCopy className="text-sm" /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* FCMB (Dollar) */}
        <div className="text-center border border-border rounded-lg p-5 shadow-sm relative">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            BANK NAME
          </p>
          <h3 className="text-xl font-bold text-foreground mb-1">FCMB</h3>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            ACCOUNT NAME
          </p>
          <h3 className="text-lg font-bold text-foreground mb-2">
            Kazfield Integrated Services
          </h3>
          <p className="text-sm font-medium text-muted-foreground mb-2">
            USD ACCOUNT NUMBER
          </p>

          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-mono font-bold text-foreground">
              2007301592
            </h3>
            <button
              onClick={() => handleCopy("2007301592")}
              className="text-xs flex items-center gap-1 bg-primary text-primary-foreground rounded px-2 py-1 hover:bg-primary/80 transition"
            >
              {copiedAccount === "2007301592" ? (
                <>
                  <FiCheck className="text-sm" /> Copied!
                </>
              ) : (
                <>
                  <FiCopy className="text-sm" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Kindly make payment to any of the above accounts and upload your receipt
        below.
      </p>
    </motion.div>
  );
}
