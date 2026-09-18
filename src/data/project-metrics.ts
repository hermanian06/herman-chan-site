import db from './rents/rent-database.json';

export type Metric = { num: string; label: string };
export type Project = 'underwriting' | 'supply' | 'rents';
const floorK = (value: number) => (Math.floor(value / 1000) * 1000).toLocaleString('en-US') + '+';

// Public rent labels reflect the checked-in snapshot, not a new production count.
// Workflow times are Herman's approximate self-reported comparison, not total runtime.
export const projectMetrics: Record<Project, { stats: Metric[]; note?: string }> = {
  underwriting: {
    stats: [
      { num: '~4 h', label: 'Previous manual preparation per deal' },
      { num: '~30 min', label: 'Current human review per deal' },
      { num: '3', label: 'Input document types' },
    ],
    note: 'Approximate, self-reported time per deal; human review excludes processing time. Inputs: OM, T-12 and rent roll.',
  },
  supply: {
    stats: [
      { num: '9', label: 'Metros' },
      { num: '3', label: 'Source categories' },
      { num: 'Weekly', label: 'Scheduled collection' },
    ],
    note: 'Environmental filings, permits and planning cases. Coverage and freshness vary by jurisdiction.',
  },
  rents: {
    stats: [
      { num: floorK(db.headline.communities), label: 'communities tracked' },
      { num: String(db.headline.markets), label: 'metros' },
      { num: floorK(db.headline.floor_plans), label: 'live floor plans' },
    ],
  },
};
