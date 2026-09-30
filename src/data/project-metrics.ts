import rentHeadline from './rents/portfolio-headline.json';
import supplyDb from './supply/supply-database.json';

export type Metric = { num: string; label: string };
export type Project = 'underwriting' | 'supply' | 'rents';
const floorK = (value: number) => (Math.floor(value / 1000) * 1000).toLocaleString('en-US') + '+';

// Rent hero totals use a separately dated aggregate; the dashboard snapshot is unchanged.
// Supply hero totals come from the same generated snapshot as the supply dashboard.
// Workflow times are Herman's approximate self-reported comparison, not total runtime.
export const projectMetrics: Record<Project, { stats: Metric[]; note?: string }> = {
  underwriting: {
    stats: [
      { num: '~4 h', label: 'Previous manual preparation per deal' },
      { num: '~30 min', label: 'Current human review per deal' },
      { num: '100+', label: 'Deals with AI-built outputs' },
    ],
  },
  supply: {
    stats: [
      { num: String(supplyDb.headline.metros), label: 'Metros' },
      { num: supplyDb.headline.tracked_feeds.toLocaleString('en-US'), label: 'Tracked source feeds' },
      { num: floorK(supplyDb.headline.source_records), label: 'Source records' },
    ],
  },
  rents: {
    stats: [
      { num: String(rentHeadline.metros), label: 'Metros' },
      { num: floorK(rentHeadline.communities_tracked), label: 'Communities tracked' },
      { num: floorK(rentHeadline.historical_rent_records), label: 'Historical rent records' },
    ],
  },
};
