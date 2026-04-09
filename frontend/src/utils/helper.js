import moment from 'moment';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if(!name) {
        return "";
    }

    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
    if(num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData.reduce((acc, item) => {
        const month = moment(item?.date).format('Do MMM');
        const existing = acc.find(e => e.month === month);
        if (existing) {
            existing.amount += item?.amount || 0;
            if (item?.category && existing.category && !existing.category.includes(item.category)) {
                existing.category += `, ${item.category}`;
            }
        } else {
            acc.push({
                month,
                category: item?.category || '',
                amount: item?.amount || 0,
            });
        }
        return acc;
    }, []);
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData.reduce((acc, item) => {
        const month = moment(item?.date).format('Do MMM');
        const existing = acc.find(e => e.month === month);
        if (existing) {
            existing.amount += item?.amount || 0;
            if (item?.source && existing.source && !existing.source.includes(item.source)) {
                existing.source += `, ${item.source}`;
            }
        } else {
            acc.push({
                month,
                amount: item?.amount || 0,
                source: item?.source || '',
            });
        }
        return acc;
    }, []);
}

export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    return sortedData.reduce((acc, item) => {
        const month = moment(item?.date).format('Do MMM');
        const existing = acc.find(e => e.month === month);
        if (existing) {
            existing.amount += item?.amount || 0;
            if (item?.category && existing.category && !existing.category.includes(item.category)) {
                existing.category += `, ${item.category}`;
            }
        } else {
            acc.push({
                month,
                amount: item?.amount || 0,
                category: item?.category || '',
            });
        }
        return acc;
    }, []);
}