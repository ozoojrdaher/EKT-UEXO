'use client'

import React, { useState } from 'react'
import { Plus, ChevronDown, ChevronRight, CheckCircle, Clock, Building2, Users, ShieldCheck } from 'lucide-react'

const groups = [
  { label: 'Group A', value: '$10' },
  { label: 'Group B', value: '$20' },
  { label: 'Group C', value: '$25' },
  { label: 'Group D', value: '$30' },
]

type NodeProps = {
  title: string
  subtitle: string
  badge?: string
  tone: 'blue' | 'purple' | 'green' | 'orange' | 'gray'
  children?: React.ReactNode
  canAdd?: boolean
}

const tones: Record<NodeProps['tone'], string> = {
  blue: 'border-blue-300 bg-blue-50',
  purple: 'border-purple-300 bg-purple-50',
  green: 'border-green-300 bg-green-50',
  orange: 'border-orange-300 bg-orange-50',
  gray: 'border-gray-300 bg-gray-50',
}

function AddForm({ owner }: { owner: string }) {
  return (
    <div className="mt-5 w-[390px] rounded-3xl border bg-white p-5 shadow-xl">
      <div className="mb-1 text-lg font-semibold">New IB / Sub IB Request</div>
      <div className="mb-4 text-xs text-gray-500">Parent: {owner}</div>
      <div className="grid gap-3">
        <input className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="Full Name" />
        <input className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="Email" />
        <input className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="MT5 Account Number" />
        <select className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10">
          <option>Select Group</option>
          {groups.map((g) => <option key={g.label}>{g.label} - {g.value}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="Master Split" />
          <input className="rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="Sub IB Split" />
        </div>
        <textarea className="min-h-[80px] rounded-xl border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10" placeholder="Notes / full network path if multi-layer" />
        <button className="rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-800">
          Submit to UEXO Ops
        </button>
      </div>
    </div>
  )
}

function TreeNode({ title, subtitle, badge, tone, children, canAdd }: NodeProps) {
  const [open, setOpen] = useState(true)
  const [formOpen, setFormOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <div className={`min-w-[230px] rounded-2xl border px-5 py-4 text-center shadow-sm ${tones[tone]}`}>
        <div className="flex items-center justify-center gap-2">
          {children && (
            <button onClick={() => setOpen(!open)} className="rounded-full bg-white p-1 shadow-sm">
              {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
            </button>
          )}
          <div className="font-bold">{title}</div>
        </div>
        <div className="mt-1 text-sm text-gray-500">{subtitle}</div>
        {badge && <div className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">{badge}</div>}
        {canAdd && (
          <button onClick={() => setFormOpen(!formOpen)} className="mt-3 rounded-xl border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50">
            <Plus size={15} className="mr-1 inline" /> Add IB / Sub IB
          </button>
        )}
      </div>
      {formOpen && <AddForm owner={title} />}
      {open && children && (
        <>
          <div className="h-10 w-[2px] bg-gray-300" />
          {children}
        </>
      )}
    </div>
  )
}

function ChildRow({ children }: { children: React.ReactNode }) {
  return <div className="flex items-start justify-center gap-10 border-t-2 border-gray-300 px-8 pt-10">{children}</div>
}

function DetailCard({ title, group, email, account, master, sub }: { title: string; group: string; email: string; account: string; master: string; sub: string }) {
  return (
    <div className="w-72 rounded-2xl border border-orange-300 bg-orange-50 p-4 text-left shadow-sm">
      <div className="font-bold">{title}</div>
      <div className="mt-1 text-sm text-gray-500">{group}</div>
      <div className="mt-4 space-y-2 text-sm">
        <div>Email: {email}</div>
        <div>Account: {account}</div>
        <div>Master Split: {master}</div>
        <div>Sub IB Split: {sub}</div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f5f6fa] p-8 text-gray-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">UEXO x Ektifaa Network Hierarchy</h1>
              <p className="mt-2 text-sm text-gray-500">Prototype for multi-layer IB/Sub-IB management and UEXO Ops approval.</p>
            </div>
            <div className="flex gap-3 text-sm">
              <span className="rounded-xl bg-gray-100 px-3 py-2">Demo Mode</span>
              <span className="rounded-xl bg-gray-100 px-3 py-2">CRM Concept</span>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {groups.map((g) => (
            <div key={g.label} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold">{g.label}</div>
              <div className="mt-1 text-2xl font-bold">{g.value}</div>
              <div className="mt-1 text-xs text-gray-500">Ektifaa rebate pool</div>
            </div>
          ))}
        </section>

        <section className="overflow-x-auto rounded-3xl bg-white p-10 shadow-sm">
          <div className="flex min-w-[1450px] flex-col items-center">
            <TreeNode title="UEXO" subtitle="Ops Approval Layer" badge="Admin" tone="blue">
              <TreeNode title="Ektifaa Office" subtitle="Premium Master Partner" badge="Master" tone="purple">
                <ChildRow>
                  <TreeNode title="Al Hindi" subtitle="Ektifaa Management / MIB" badge="Active" tone="green" canAdd>
                    <ChildRow>
                      <DetailCard title="IB Alpha" group="Group B - $20" email="alpha@ib.com" account="102938" master="$10" sub="$10" />
                      <DetailCard title="IB Beta" group="Group D - $30" email="beta@ib.com" account="556677" master="$15" sub="$15" />
                    </ChildRow>
                  </TreeNode>

                  <TreeNode title="Sarwat" subtitle="Ektifaa Management / MIB" badge="Active" tone="green" canAdd>
                    <ChildRow>
                      <DetailCard title="Sub IB 1" group="Group A - $10" email="sub1@ib.com" account="778899" master="$4" sub="$6" />
                      <DetailCard title="Sub IB 2" group="Group C - $25" email="sub2@ib.com" account="998877" master="$10" sub="$15" />
                    </ChildRow>
                  </TreeNode>
                </ChildRow>
              </TreeNode>
            </TreeNode>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <Clock className="mb-3" />
            <div className="font-semibold">1. Submitted</div>
            <div className="mt-1 text-sm text-gray-500">Ektifaa management submits IB/Sub-IB request.</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <ShieldCheck className="mb-3" />
            <div className="font-semibold">2. UEXO Ops Review</div>
            <div className="mt-1 text-sm text-gray-500">Ops validates hierarchy, group, account number, and split.</div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm">
            <CheckCircle className="mb-3" />
            <div className="font-semibold">3. Approved</div>
            <div className="mt-1 text-sm text-gray-500">CRM / MT5 is updated after approval.</div>
          </div>
        </section>
      </div>
    </main>
  )
}
