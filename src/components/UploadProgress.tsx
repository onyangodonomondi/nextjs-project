interface UploadProgressProps {
  isLoading: boolean;
}

export default function UploadProgress({ isLoading }: UploadProgressProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p>Processing image...</p>
        </div>
      </div>
    </div>
  );
} 