export const initialState = {
    title: 'Gallery',
    navTitle: '',
    navBarGalleryMenu: {},
};

export const Reducer = (state, action) => {
    switch (action.type) {
        case "set_title": {
            return {
                ...state,
                title: 'Gallery' + (action?.value ? ` - ${action.value}` : ''),
                navTitle: action?.value ? action.value : '',
            };
        }
        case "set_NavBarGalleryMenu": {
            return {
                ...state,
                navBarGalleryMenu: action?.value ? action.value : {},
            };
        }
    }
};
