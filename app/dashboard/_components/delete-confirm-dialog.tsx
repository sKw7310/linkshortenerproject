'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteLink } from '../actions';
import type { Link } from '@/db/schema';

interface DeleteConfirmDialogProps {
  link: Link;
  children?: React.ReactNode;
}

export function DeleteConfirmDialog({ link, children }: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    const result = await deleteLink({ linkId: link.id });

    if ('error' in result) {
      setError(result.details || result.error || 'An error occurred');
      setIsLoading(false);
    } else {
      // Success - close dialog
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button variant="outline" size="sm">Delete</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete Link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this link? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="rounded-md bg-muted p-4 space-y-2">
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground shrink-0">
                Short Code:
              </span>
              <code className="text-sm bg-background px-2 py-1 rounded">
                {link.shortCode}
              </code>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-medium text-muted-foreground shrink-0">
                Destination:
              </span>
              <span className="text-sm break-all">
                {link.originalUrl}
              </span>
            </div>
            {link.title && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-muted-foreground shrink-0">
                  Title:
                </span>
                <span className="text-sm">
                  {link.title}
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete Link'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
