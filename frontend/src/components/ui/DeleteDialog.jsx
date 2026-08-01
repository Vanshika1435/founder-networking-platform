function DeleteDialog({
    open,
    onClose,
    onDelete,
}){

    if(!open) return null;

    return(

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-3xl p-8 w-[400px]">

                <h2 className="text-2xl font-bold">
                    Delete Membership?
                </h2>

                <p className="mt-4 text-gray-500">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onClose}
                        className="bg-gray-200 px-5 py-2 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        className="bg-red-600 text-white px-5 py-2 rounded-xl"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteDialog;