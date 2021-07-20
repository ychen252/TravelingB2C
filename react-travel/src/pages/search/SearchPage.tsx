import styles from "./SearchPage.module.css";
import { Header, Footer, FilterArea, ProductList } from "../../components";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProduct } from "../../redux/productSearch/slice";
import React, { useEffect } from "react";
import { useSelector } from "../../redux/hooks";
import { Spin } from "antd";
import { MainLayout } from "../../layout";

interface MatchParams {
    keywords: string
}

export const SearchPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { keywords } = useParams<MatchParams>();

    const pagination = useSelector((state) => state.productSearch.pagination);
    const data = useSelector((state) => state.productSearch.data);
    const loading = useSelector((state) => state.productSearch.loading);
    const error = useSelector((state) => state.productSearch.error);

    useEffect(() => {
        dispatch(searchProduct({ keywords: keywords, nextPage: 1, pageSize: 6 }));
    }, [location])

    const onPageChange = (nextPage, pageSize) => { dispatch(searchProduct({ keywords, nextPage, pageSize })); }

    if (loading) {
        return <Spin />
    }
    else if (error) {
        return <div>This API has some errors, {error}</div>
    }
    return (
        <MainLayout>
            <div className={styles["page-content"]}>
                <div className={styles["product-list-container"]}>
                    <FilterArea />
                </div>
                <div className={styles["product-list-container"]}>
                    <ProductList data={data} paging={pagination} onPageChange={onPageChange} />
                </div>
            </div>
        </MainLayout>
    )
}