import { useEffect, useState } from "react"
import { Card, CardHeader, CardPreview, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Subtitle1, TableCellLayout, TableColumnSizingOptions, createTableColumn } from "@fluentui/react-components"
import { FilteredOrder, FilteredSubItem } from "../../services/Filters.service"

interface SubItemsCountProps {
    assignedOrders: FilteredOrder[] | null
}
interface SubItemCount {
    productId: string;
    quantity: number;
    name: string;
}

export const SubItemsCount: React.FunctionComponent<SubItemsCountProps> = ({ assignedOrders }) => {

    const [subItemsCount, setSubItemsCount] = useState<SubItemCount[]>([]);

    const countSubItems = () => {

        const itemsCount: Record<string, { quantity: number, name: string }> = {}

        assignedOrders?.forEach(order => {
            order.subItems.forEach(subItem => {
                const { name, product_number } = subItem.product
                const { quantity } = subItem
                if (itemsCount[product_number]) {
                    itemsCount[product_number].quantity += quantity;
                } else {
                    itemsCount[product_number] = { quantity, name };
                }
            })
        })

        const subItemsArray = Object.entries(itemsCount).map(([productId, { quantity, name }]) => ({
            productId,
            quantity,
            name,
        }));

        setSubItemsCount(subItemsArray)
    }

    useEffect(() => {
        console.log(assignedOrders);
        countSubItems()
    }, [assignedOrders])


    const columns = [
        createTableColumn<SubItemCount>({
            columnId: "itemDescription",
            renderHeaderCell: () => {
                return "פריט";
            },
            renderCell: (item: SubItemCount) => {
                return <TableCellLayout>{item.name}</TableCellLayout>;
            },
        }),
        createTableColumn<FilteredSubItem>({
            columnId: "quantity",
            renderHeaderCell: () => {
                return "כמות";
            },
            renderCell: (item) => {
                return <TableCellLayout>{item.quantity}</TableCellLayout>;
            },
        }),
    ];

    const columnSizing: TableColumnSizingOptions = {
        itemDescription: {
            minWidth: 50,
            defaultWidth: 50
        },
        quantity: {}
    };

    const cardStyle: React.CSSProperties = {
        background: "rgb(207 228 250 / 40%)",
      };

    return (
        <>
            <Card style={cardStyle}>
                <CardHeader
                    header={<Subtitle1>סה"כ לפי פריט</Subtitle1>}
                // description={itemRender.header(order)}
                />
                <CardPreview>
                    <DataGrid
                        items={subItemsCount}
                        columns={columns}
                        getRowId={(item) => item.id}
                        columnSizingOptions={columnSizing}
                    >
                        <DataGridHeader>
                            <DataGridRow selectionCell={{ style: { display: "none" } }}>
                                {({ renderHeaderCell }) => (
                                    <DataGridHeaderCell style={{ fontWeight: "bold" }}>{renderHeaderCell()}</DataGridHeaderCell>
                                )}
                            </DataGridRow>
                        </DataGridHeader>
                        <DataGridBody<SubItemCount>>
                            {({ item, rowId }) => (
                                <DataGridRow<SubItemCount> key={rowId}>
                                    {({ renderCell }) => (
                                        <DataGridCell>{renderCell(item)}</DataGridCell>
                                    )}
                                </DataGridRow>
                            )}
                        </DataGridBody>
                    </DataGrid>
                </CardPreview>
            </Card>
        </>
    )
}
