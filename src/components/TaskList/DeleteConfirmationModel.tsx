import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    taskTitle: string;
}

export function DeleteConfirmationModal({ isOpen, onClose, onConfirm, taskTitle }: DeleteConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Confirm Deletion</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        Are you sure you want to delete the task &quot;{taskTitle}&quot;? This action cannot be undone.

                    </p>
                </div>
                <DialogFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}