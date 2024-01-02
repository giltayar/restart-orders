import { useEffect, useState } from 'react'
import { Card, CardHeader, CardPreview, DataGrid, DataGridBody, DataGridCell, DataGridHeader, DataGridHeaderCell, DataGridRow, Subtitle1, TableCellLayout } from '@fluentui/react-components'
import { FilteredOrder } from '../../services/Filters.service'

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

    useEffect(() => {
        console.log(subItemsCount);

    }, [subItemsCount])

    return (
        <>
            <Card>
                <CardHeader
                    header={<Subtitle1>title</Subtitle1>}
                // description={itemRender.header(order)}
                />
                <CardPreview>
                    {/* <DataGrid
                        items={[]}
                    // columns={}
                    // getRowId={(item) => item.id}
                    // columnSizingOptions={columnSizing}
                    >
                        <DataGridHeader>
                            <DataGridRow selectionCell={{ style: { display: "none" } }}>
                                {({ renderHeaderCell }) => (
                                    <DataGridHeaderCell style={{ fontWeight: "bold" }}>{renderHeaderCell()}</DataGridHeaderCell>
                                )}
                            </DataGridRow>
                        </DataGridHeader>
                        <DataGridBody>
                            <DataGridRow>
                                <DataGridCell>
                                    <TableCellLayout></TableCellLayout>
                                </DataGridCell>
                            </DataGridRow>

                        </DataGridBody>
                    </DataGrid> */}
                </CardPreview>
            </Card>
        </>
    )
}
