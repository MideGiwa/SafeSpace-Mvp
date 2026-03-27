import React, { useState } from 'react';
import { formatCurrency } from '../../utils/currency';
import { tokenTransactions } from '../../data/tokens';
import { useAuthStore } from '../../stores/useAuthStore';
import styles from './Tokens.module.css';

const packages = [
  { tokens: 5,  label: 'Starter', price: formatCurrency(12000), tag: null,         note: '1 individual session' },
  { tokens: 20, label: 'Popular', price: formatCurrency(44000), tag: 'BEST VALUE',   note: '4 sessions, save ₦4k' },
  { tokens: 50, label: 'Pro',     price: formatCurrency(100000), tag: null,         note: '10 sessions, save ₦20k' },
];

export const Tokens: React.FC = () => {
  const { user } = useAuthStore();
  const isProfessional = user?.role === 'PROFESSIONAL';
  const [tab, setTab] = useState<'history' | 'fund'>('history');
  const [selected, setSelected] = useState(1);

  if (isProfessional) {
    return (
      <div className={styles.page}>
        <header className={styles.earningsHeader}>
          <div>
            <h1 className={styles.title}>Professional Wallet</h1>
            <p className={styles.subtitle}>Manage your clinical earnings and payout requests.</p>
          </div>
        </header>

        {/* Earnings Hero */}
        <div className={styles.earningsCard}>
          <div className={styles.earningsMain}>
            <p className={styles.balanceLabel}>Lifetime Revenue</p>
            <div className={styles.earningsValue}>{formatCurrency(12480450)}</div>
            <p className={styles.balanceNote}>Updated 14 mins ago</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.earningsGrid}>
          <div className={styles.statCard}>
            <h4>Pending Payout</h4>
            <div className={styles.statValue}>{formatCurrency(120500)}</div>
          </div>
          <div className={styles.statCard}>
            <h4>Settled This Month</h4>
            <div className={styles.statValue}>{formatCurrency(2450000)}</div>
          </div>
        </div>

        {/* Payout Action */}
        <div className={styles.payoutSection}>
          <div className={styles.payoutInfo}>
            <h3>Ready for payout?</h3>
            <p>Withdraw your earnings to your verified bank account.</p>
          </div>
          <button className={styles.payoutBtn}>Request Payout</button>
        </div>

        {/* Analytics Section */}
        <div className={styles.analyticsBox}>
          <div className={styles.analyticsHeader}>
            <h3>Monthly Goal Progress</h3>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>84%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '84%' }}></div>
          </div>
          <div className={styles.progressLabels}>
            <span>₦2.4M earned</span>
            <span>Target: ₦3M</span>
          </div>
        </div>

        {/* History Preview */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 800 }}>Revenue History</h3>
          <div className={styles.transactionList}>
            {[
              { id: 1, label: 'Session Payout - Client #42', date: 'Oct 24, 2024', amount: '+ ₦12,000', type: 'credit' },
              { id: 2, label: 'Group Session Payout - "Anxiety 101"', date: 'Oct 22, 2024', amount: '+ ₦45,000', type: 'credit' },
              { id: 3, label: 'Platform Commission (10%)', date: 'Oct 22, 2024', amount: '- ₦4,500', type: 'debit' },
            ].map(tx => (
              <div key={tx.id} className={styles.txRow}>
                <div className={`${styles.txIcon} ${tx.type === 'credit' ? styles.txIconCredit : styles.txIconDebit}`}>
                  <span className="material-symbols-outlined">
                    {tx.type === 'credit' ? 'trending_up' : 'trending_down'}
                  </span>
                </div>
                <div className={styles.txInfo}>
                  <p className={styles.txLabel}>{tx.label}</p>
                  <p className={styles.txDate}>{tx.date}</p>
                </div>
                <div className={`${styles.txAmount} ${tx.type === 'credit' ? styles.credit : styles.debit}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>SafeTokens</h1>
          <p className={styles.subtitle}>Your in-platform currency for sessions and groups</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className={styles.balanceCard}>
        <div className={styles.balanceLeft}>
          <p className={styles.balanceLabel}>Current Balance</p>
          <div className={styles.balanceAmount}>
            <span className="material-symbols-outlined">toll</span>
            <span className={styles.balanceNum}>13</span>
            <span className={styles.balanceSuffix}>tokens</span>
          </div>
        </div>
        <div className={styles.balanceRight}>
          <button className={styles.addBtn} onClick={() => setTab('fund')}>
            <span className="material-symbols-outlined">add_circle</span> Add Tokens
          </button>
          <button className={styles.historyBtn} onClick={() => setTab('history')}>
            <span className="material-symbols-outlined">history</span> History
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className={styles.howItWorks}>
        <div className={styles.howCard}>
          <span className="material-symbols-outlined">toll</span>
          <h4>Token = Session Currency</h4>
          <p>Professionals set their own rates for sessions. Many support groups are free, but some specialized groups may charge a small entry fee.</p>
        </div>
        <div className={styles.howCard}>
          <span className="material-symbols-outlined">security</span>
          <h4>Secure Payments</h4>
          <p>All transactions are encrypted and processed via secure payment gateways.</p>
        </div>
        <div className={styles.howCard}>
          <span className="material-symbols-outlined">block</span>
          <h4>No Expiry</h4>
          <p>Your tokens never expire. Use them at your own pace, on your schedule.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={tab === 'history' ? styles.tabActive : styles.tab} onClick={() => setTab('history')}>Transaction History</button>
        <button className={tab === 'fund' ? styles.tabActive : styles.tab} onClick={() => setTab('fund')}>Add Tokens</button>
      </div>

      {/* History Tab */}
      {tab === 'history' && (
        <div className={styles.transactionList}>
          {tokenTransactions.map(tx => (
            <div key={tx.id} className={styles.txRow}>
              <div className={`${styles.txIcon} ${tx.type === 'credit' ? styles.txIconCredit : styles.txIconDebit}`}>
                <span className="material-symbols-outlined">
                  {tx.type === 'credit' ? 'add' : 'remove'}
                </span>
              </div>
              <div className={styles.txInfo}>
                <p className={styles.txLabel}>{tx.label}</p>
                <p className={styles.txDate}>{tx.date}</p>
              </div>
              <div className={`${styles.txAmount} ${tx.type === 'credit' ? styles.credit : styles.debit}`}>
                {tx.type === 'credit' ? '+' : ''}{tx.amount} tokens
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fund Tab */}
      {tab === 'fund' && (
        <div className={styles.fundSection}>
          <p className={styles.fundSubtitle}>Choose a token package to get started:</p>
          <div className={styles.packages}>
            {packages.map((pkg, i) => (
              <div 
                key={i} 
                className={`${styles.package} ${selected === i ? styles.packageSelected : ''}`}
                onClick={() => setSelected(i)}
              >
                {pkg.tag && <div className={styles.packageTag}>{pkg.tag}</div>}
                <div className={styles.packageTokens}>
                  <span className="material-symbols-outlined">toll</span>
                  <span>{pkg.tokens}</span>
                </div>
                <p className={styles.packageLabel}>{pkg.label}</p>
                <p className={styles.packageNote}>{pkg.note}</p>
                <p className={styles.packagePrice}>{pkg.price}</p>
              </div>
            ))}
          </div>
          
          <div className={styles.paymentSection}>
            <p className={styles.payLabel}>Payment Method</p>
            <div className={styles.payMethods}>
              <div className={styles.payMethod}>
                <span className="material-symbols-outlined">credit_card</span>
                <span>Card ending in ••••</span>
              </div>
            </div>
            <button className={styles.payBtn}>
              Proceed to Payment <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <p className={styles.payNote}>Secure payment. Tokens are added instantly.</p>
          </div>
        </div>
      )}

    </div>
  );
};
