
function RowSkeleton({ cols }: { cols: string[] }) {
    return (
        <tr>
            <td ><div className="skeleton h-6 w-6"></div></td>
            <td><div className="skeleton h-4 w-4"></div></td>


            {
                cols.map((_, i) => {
                    return (
                        <td key={i}><div className="skeleton h-4 w-32"></div></td>
                    )
                })
            }

            <td><div className="skeleton h-8 w-32"></div></td>
        </tr>
    )
}

interface Props {
    cols: string[]
}

export default function TableSkeleton({ cols }: Props) {
    return (
        <table className="table table-xs mt-2">
            <thead>
                <tr>
                    <th>
                        <div className="skeleton h-6 w-6"></div>
                    </th>
                    <th>No</th>
                    {
                        cols.map((col) => {
                            return (
                                <th key={`${col}-head`}>{col}</th>
                            )
                        })
                    }
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                <RowSkeleton cols={cols} />
                <RowSkeleton cols={cols} />
                <RowSkeleton cols={cols} />
                <RowSkeleton cols={cols} />
                <RowSkeleton cols={cols} />
            </tbody>
        </table>
    )
}