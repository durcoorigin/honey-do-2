export const getChoreIds = () => {
    const savedChoreIds = localStorage.getItem('saved chores')
    ? JSON.parse(localStorage.getItem('saved chores'))
    : [];

    return savedChoreIds;
};

export const saveChoreIds = (choreIdArr) => {
    if (choreIdArr.length) {
        localStorage.setItem('saved chores', JSON.stringify(choreIdArr));
    } else {
        localStorage.removeItem('saved chores');
    }
};

export const removeChoreId = (choreId) => {
    const  savedChoreIds = localStorage.getItem('saved chores')
    ? JSON.parse(localStorage.getItem('saved chores'))
    : null;

    if (!savedChoreIds) {
        return false;
    }

    const updatedSavedChoreIds = savedChoreIds?.filter((savedChoreId) => 
        savedChoreId !== choreId);
        localStorage.setItem('saved chores', JSON.stringify(updatedSavedChoreIds));

        return true;
};