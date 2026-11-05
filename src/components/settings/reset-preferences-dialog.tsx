import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ResetPreferencesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ResetPreferencesDialog({ open, onOpenChange, onConfirm }: ResetPreferencesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent maxWidth="max-w-md">
        <DialogHeader>
          <DialogTitle>Reset preferences?</DialogTitle>
          <DialogDescription>This will restore the default AI Vakil preferences for this demo.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse sm:flex-row">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            variant="primary"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Reset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
