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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createLink } from '../actions';

interface CreateLinkDialogProps {
  children?: React.ReactNode;
}

export function CreateLinkDialog({ children }: CreateLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    originalUrl: '',
    shortCode: '',
    title: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data = {
      originalUrl: formData.originalUrl,
      shortCode: formData.shortCode || undefined,
      title: formData.title || undefined,
    };

    const result = await createLink(data);

    if ('error' in result) {
      setError(result.details || result.error || 'An error occurred');
      setIsLoading(false);
    } else {
      // Success - reset form and close dialog
      setFormData({
        originalUrl: '',
        shortCode: '',
        title: '',
      });
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button>Create New Link</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Short Link</DialogTitle>
          <DialogDescription>
            Enter the URL you want to shorten and optionally customize your short link.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="originalUrl">
              Destination URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="originalUrl"
              name="originalUrl"
              type="url"
              placeholder="https://example.com/your-long-url"
              value={formData.originalUrl}
              onChange={handleInputChange}
              required
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              The URL you want to redirect to
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortCode">Custom Short Code (optional)</Label>
            <Input
              id="shortCode"
              name="shortCode"
              type="text"
              placeholder="my-link"
              value={formData.shortCode}
              onChange={handleInputChange}
              disabled={isLoading}
              pattern="[a-zA-Z0-9_-]+"
              minLength={3}
              maxLength={20}
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to auto-generate. Only letters, numbers, hyphens, and underscores.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (optional)</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="My awesome link"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isLoading}
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground">
              A friendly name for your link
            </p>
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
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Link'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
