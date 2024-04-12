export const setIsAuthenticatedToLS = (isAuthenticated: boolean) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
};

export const getIsAuthenticatedFromLS = () => {
    const result = localStorage.getItem('isAuthenticated');
    return result ? JSON.parse(result) : false;
};
