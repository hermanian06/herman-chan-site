import db from './rents/rent-database.json';

export type Metric = { num: string; label: string };
export type Project = 'underwriting' | 'supply' | 'rents';
const floorK = (value: number) => (Math.floor(value / 1000) * 1000).toLocaleString('en-US') + '+';

// Public rent labels reflect the checked-in snapshot, not a new production count.
// Workflow times are Herman's approximate self-reported comparison, not total runtime.
export const projectMetrics: Record<Project, { stats: Metric[]; note?: string }> = {
  underwriting: {
    stats: [
      { num: '100+', label: 'Deals with AI-built outputs' },
      { num: '~4 h', label: 'Previous manual preparation per deal' },
      { num: '~30 min', label: 'Current human review per deal' },
    ],
  },
  supply: {
    stats: [
      { num: '9', label: 'Metros' },
      { num: '250', label: 'Tracked source feeds' },
      { num: '355,000+', label: 'Source records' },
    ],
  },
  rents: {
    stats: [
      { num: floorK(db.headline.communities), label: 'communities tracked' },
      { num: String(db.headline.markets), label: 'metros' },
      { num: floorK(db.headline.floor_plans), label: 'live floor plans' },
    ],
  },
};
