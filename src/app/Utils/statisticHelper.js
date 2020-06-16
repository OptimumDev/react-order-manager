import {colors} from "../Constants/Colors";

export const getStatistics = (orders) => {
    return orders.reduce((acc, order) => {
        acc.count += 1;
        acc.quantity += order.quantity;
        acc.area += order.area;
        acc.byColor[order.color] += 1;

        return acc;
    }, {
        count: 0,
        quantity: 0,
        area: 0,
        byColor: colors.reduce((acc, color) => {
            acc[color] = 0;
            return acc;
        }, {})
    });
}
