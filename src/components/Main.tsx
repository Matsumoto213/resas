import React, { useEffect, useState } from "react";
import CheckField from "./CheckField";
import Graph from "./Graph";

import axios from "axios";

const Styles: { [key: string]: React.CSSProperties } = {
    graph: {
        padding: "10px",
    },
    label: {
        fontSize: "20px",
        padding: "0.5rem 2rem",
        borderLeft: "4px solid white",
        marginLeft: "10pt",
    },
}

const Main: React.FC = () => {
    console.log(import.meta.env.BASE_URL)
    console.log(import.meta.env.VITE_API_KEY)
    const [prefectures, setPreFectures] = useState<{
        message: null;
        result: {
          prefCode: number;
          prefName: string;
        }[];
    } | null>(null);
    const [prefPopulation, setPrefPopulation] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]>([]);
    useEffect(() => {
        axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
            headers: {"X-API-KEY": import.meta.env.VITE_API_KEY },
        })
        .then((results) => {
            setPreFectures(results.data);
            console.log(results.data);
          })
          .catch((error) => {});
    }, []);

    const handleClickCheck = (
        prefName: string,
        prefCode: number,
        check: boolean
        ) => {
        let c_prefPopulation = prefPopulation.slice();
        if (check) {
            if (c_prefPopulation.findIndex((value) => value.prefName === prefName) !== -1) return;
            axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" + String(prefCode),
            {
                headers: { "X-API-KEY": import.meta.env.VITE_API_KEY },
            }
            )
            .then((results) => {
            c_prefPopulation.push({
                prefName: prefName,
                data: results.data.result.data[0].data,
            });

            setPrefPopulation(c_prefPopulation);
            })
            .catch((error) => {
            return;
            });
        }
        else {
            const deleteIndex = c_prefPopulation.findIndex((value) => value.prefName === prefName);
            if (deleteIndex === -1) return;
            c_prefPopulation.splice(deleteIndex, 1);
            setPrefPopulation(c_prefPopulation);
        }
    };

    return (
        <main>
          <h2 style={Styles.label}>都道府県</h2>
          {prefectures && (<CheckField prefectures={prefectures.result} onChange={handleClickCheck}/>)}
          <h2 style={Styles.label}>人口推移グラフ</h2>
          <Graph populationdata={prefPopulation} />
        </main>
    );
}

export default Main;