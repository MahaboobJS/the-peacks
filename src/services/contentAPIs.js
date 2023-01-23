const base = 'https://content.guardianapis.com/';
const key = 'a65c1ed7-a419-467c-a665-d4224c584020'; //'37a15cab-b02a-4274-a344-68fc3f5cb899';

const getTOPNews = (sectionType, sortBy, callback) => {
    return async () => {
        const sendRequest = async () => {

            const response = await fetch(
                `${base}search?section=${sectionType}&show-fields=headline,trailText,thumbnail&show-refinements&page-size=10&order-by=${sortBy}&=all&api-key=${key}`
            );

            let results = await response.json();
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            return results;
        }

        try {
            const data = await sendRequest();
            callback(data.response.results);

        } catch (err) {
            console.log(err);

        }
    }

}

const getAllSectionNews = (urls, sortBy, callback) => {
    return async () => {
        const collection = await Promise.all(urls.map(async sectionType => {

            const resp = await fetch(`${base}search?section=${sectionType}&show-fields=headline,trailText,thumbnail&show-refinements&page-size=6&order-by=${sortBy}&=all&api-key=${key} `);
            return resp.json();
        }));
        const response = {
            'sport': (collection && collection[0]) && collection[0].response.results || [],
            'culture': (collection && collection[1]) && collection[1].response.results || [],
            'lifeAndStyle': (collection && collection[2]) && collection[2].response.results || [],
        }
        callback(response);
    }
}

const getArticleInformation = (id, callback) => {
    return async () => {
        const sendRequest = async () => {
            const response = await fetch(
                `${base}${id}?show-fields=headline,trailText,thumbnail,body&all&api-key=${key} `
            );
            let results = await response.json();
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            return results;
        }
        try {
            const data = await sendRequest();
            callback(data.response.content);

        } catch (err) {
            console.log(err);

        }
    }

}


const getSearchResults = (searchTerm, sortStr, pageNumber, callback) => {
    return async () => {
        const sendRequest = async () => {
            const pageSize = 15;
            const response = await fetch(
                `${base}search?q=${searchTerm}&page-size=${pageSize}&page=${pageNumber}&show-fields=headline,trailText,thumbnail&order-by=${sortStr}&api-key=${key}`
            );
            let results = await response.json();
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            return results;
        }
        try {
            const data = await sendRequest();
            callback(data.response.results);

        } catch (err) {
            console.log(err);

        }
    }

}



export { getArticleInformation, getTOPNews, getSearchResults, getAllSectionNews }