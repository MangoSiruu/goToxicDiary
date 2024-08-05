export const getEngCategoryType = (category) => {
    switch (category) {
        case '술':
            return 'beer';
        case '인스턴트':
            return 'instant';
        case '매운음식':
            return 'pepper';
        case '카페인':
            return 'coffee';
        case '야식':
            return 'pizza';
        case '액상과당':
            return 'cola';
        case '기타':
            return 'spoon';
    }
}