'use client';

import { useState, useEffect } from 'react';

interface RenameDialogProps {
  isOpen: boolean;
  originalName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
}

export function RenameDialog({ isOpen, originalName, onClose, onRename }: RenameDialogProps) {
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setNewName(originalName.split('.')[0]);
    }
  }, [isOpen, originalName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRename(newName.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Rename Image</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg mb-4"
            placeholder="Enter new name"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              disabled={!newName.trim()}
            >
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 