import { useEffect } from "react";

const BACKEDN_IP = 'http://54.167.96.255:5000/'

const FilterController = () => {

    const location = BACKEDN_IP + 'search';
    
    useEffect(() => {
        const data = {
            "max_count": 10,
            "amenities": "Internet, Pool, Massage",
            "cities": "Bucharest, Vienna, Hamburg",
            "countries": "Austria, Romania, Finland, Germany",
        }

        const params = new URLSearchParams(data);

        fetch(location + `?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: "no-cache",
        headers: {
            'Accept': 'application/json',
        },
        })
        .then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))

    }, [location])
}

export default FilterController;