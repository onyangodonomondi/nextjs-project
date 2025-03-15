import { memo, useMemo } from 'react';
import { FiImage, FiHardDrive, FiBarChart, FiFolder } from 'react-icons/fi';
import type { ImageItem } from '@/utils/getImages';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border">
    <div className="flex items-center gap-3">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const ImageStats = memo(function ImageStats({ images }: { images: ImageItem[] }) {
  const stats = useMemo(() => ({
    total: images.length,
    totalSize: images.reduce((acc, img) => acc + (img.size || 0), 0),
    avgSize: images.length ? images.reduce((acc, img) => acc + (img.size || 0), 0) / images.length : 0,
    categories: Object.entries(
      images.reduce((acc, img) => {
        acc[img.category || 'uncategorized'] = (acc[img.category || 'uncategorized'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ),
  }), [images]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Images"
        value={stats.total}
        icon={<FiImage className="w-5 h-5" />}
      />
      <StatCard
        title="Total Size"
        value={formatBytes(stats.totalSize)}
        icon={<FiHardDrive className="w-5 h-5" />}
      />
      <StatCard
        title="Average Size"
        value={formatBytes(stats.avgSize)}
        icon={<FiBarChart className="w-5 h-5" />}
      />
      <StatCard
        title="Categories"
        value={stats.categories.length}
        icon={<FiFolder className="w-5 h-5" />}
      />
    </div>
  );
}); 