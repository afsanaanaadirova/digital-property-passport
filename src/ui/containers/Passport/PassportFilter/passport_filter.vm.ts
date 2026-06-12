import {
    useAreas,
    useBuildingOwnershipTypes,
    useBuildingPropertyTypes,
    useDestinations,
    useLandOwnershipTypes,
    useLandPropertyshipTypes,
    useOwnerTypes,
    useSaleTransactionTypes,
} from "@/app/api/dropdowns.api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";


export const PassportFilterVm = () => {
    const { data: areas, isLoading: areasLoading } = useAreas();
    const { data: ownerTypes, isLoading: ownerTypesLoading } = useOwnerTypes();
    const { data: saleTransactionTypes } = useSaleTransactionTypes();
    const { data: destinations, isLoading: destinationsLoading } = useDestinations();
    const { data: landPropertyshipTypes, isLoading: landPropertyshipTypesLoading } = useLandPropertyshipTypes();
    const { data: buildingPropertyTypes, isLoading: buildingPropertyTypesLoading } = useBuildingPropertyTypes();
    const { data: landOwnershipTypes, isLoading: landOwnershipTypesLoading } = useLandOwnershipTypes();
    const { data: buildingOwnershipTypes, isLoading: buildingOwnershipTypesLoading } = useBuildingOwnershipTypes();

    const [personTypeInFilter, setPersonTypeInFilter] = useState<number>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [modalFilter, setModalFilter] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const methods = useForm<any>();

    const filterParams = new URLSearchParams(
        searchParams
            .get("filter")
            ?.replace(/-like-/g, "-like=")
            .replace(/-eq-/g, "-eq=")
            .replace(/-and\//g, "&")
    );

    const handleInputChange = (paramName: string, val: string) => {
        if (!val) {
            filterParams.delete(paramName);
        } else {
            filterParams.set(paramName, val);
        }

        setSearchParams((params) => {
            if (!val) {
                params.delete(paramName);
            }

            const newFilter = filterParams
                .toString()
                .replace(/=/g, "-")
                .replace(/&/g, "-and/")
                .replace(/--and/g, "-and");
            params.set("filter", newFilter);
            return params;
        });
    };
    const handleSelectChange = (
        paramName: string,
        val: { id: number; name: string }
    ) => {
        if (!val.id) {
            filterParams.delete(`${paramName}-eq`);
        } else {
            filterParams.set(`${paramName}-eq`, val.id.toString());
        }

        setSearchParams((params) => {
            if (!val.id) {
                params.delete(paramName);
            }

            const newFilter = filterParams
                .toString()
                .replace(/=/g, "-")
                .replace(/&/g, "-and/")
                .replace(/--and/g, "-and");
            const decodedItem = newFilter.includes('%5B') || newFilter.includes('%5D')
                ? decodeURIComponent(newFilter)
                : newFilter;
            params.set("filter", decodedItem);

            return params;
        });
    };
    const handleModalChange = (
        paramName: string,
        val: string | { id: number; name: string }
    ) => {
        const value =
            typeof val === "string" ? val : val.id ? val.id.toString() : null;
        if (!value || value === "0" || value === null) {
            paramName.split("-").includes("like") ? filterParams.delete(paramName) : filterParams.delete(`${paramName}-eq`);
        } else {
            paramName.split("-").includes("like") ? filterParams.set(paramName, value) : filterParams.set(`${paramName}-eq`, value);
        }
        setSearchParams((params) => {
            if (!value || value === "0" || value == "" || value == null) {
                setModalFilter((prev: any) => {
                    return prev.filter((item: any) => {
                        if (item.split("-").includes("like")) {
                            const items = item.split("-");
                            const combined = `${items[0]}-${items[1]}`;
                            return combined !== paramName
                        }
                        return item.split("-")[0] !== paramName
                    })
                }
                );
                params.delete(paramName);
            }

            const newFilter = filterParams
                .toString()
                .replace(/=/g, "-")
                .replace(/&/g, "-and/")
                .replace(/--and/g, "-and");

            setModalFilter((prev) => {
                const newFilterParts = newFilter.split("-and/");

                const filterMap = new Map(
                    prev.map((x) => {
                        const key = x.split("-")[0];
                        return [key, x];
                    })
                );
                const filteredNewFilterParts = newFilterParts.filter((t) => {
                    const parts = t.split("-");
                    const key = parts[0];
                    const key2 = parts[2];
                    console.log("key2",key2)

                    if (key === "Estate.Owners%5BOwnerTypeId%5D" && key2 === "3") {
                        if (key === "Estate.Owners%5BOwnerTypeId%5D") {
                            filterMap.clear();
                            return false;
                        }
                    }
                    return true;
                });

                filteredNewFilterParts.forEach((t) => {
                    const key = t.split("-")[0];
                    if (t.trim() !== '') {
                        filterMap.set(key, t);
                    }
                });
                const updatedFilter = Array.from(filterMap.values()).filter((x) => x.trim() !== '');
                return updatedFilter;
            });
            return params;
        });
    };
    const onClearFilters = (e: any) => {
        e.preventDefault();
        methods.reset();
        setModalFilter([])
        setSearchParams((params) => {
            Array.from(params.keys()).forEach((key) => {
                params.delete(key);
            });
            return params;
        });
        setModalVisible(false)
    };
    const decodedFilter = modalFilter
        .map((item, index, arr) => {
            const decodedItem = item.includes('%5B') || item.includes('%5D')
                ? decodeURIComponent(item)
                : item;

            return index === arr.length - 1 ? decodedItem : decodedItem + "-and";
        })
        .join("/")
        .replace(/(^|\/)-and(\/|$)/g, '$1');
        
    const handleModalSubmitChange = () => {
        if (decodedFilter.trim() !== "") {

            const filters = decodedFilter.split("-and/");

            const processedFilters: string[] = filters.reduce((acc: string[], filter: string) => {
                if (filter.includes('SearchIndexer.IdentifierIndexer-like')) {
                    if (!acc.some(existingFilter => existingFilter.includes('SearchIndexer.IdentifierIndexer-like'))) {
                        acc.push(filter);
                    }
                } else {
                    acc.push(filter);
                }
                return acc;
            }, []);
            const newDecodedFilter = processedFilters.join("-and/");

            setSearchParams((params) => {
                params.set("filter", newDecodedFilter);
                return params;
            });
        } else {
            setSearchParams((params) => {
                params.delete("filter");
                return params;
            });
        };
    };
    return {
        areas,
        ownerTypes,
        destinations,
        areasLoading,
        ownerTypesLoading,
        methods,
        landOwnershipTypesLoading,
        buildingOwnershipTypesLoading,
        onClearFilters,
        destinationsLoading,
        buildingOwnershipTypes,
        landPropertyshipTypes,
        buildingPropertyTypes,
        handleModalSubmitChange,
        landOwnershipTypes,
        landPropertyshipTypesLoading,
        saleTransactionTypes,
        buildingPropertyTypesLoading,
        modalVisible,
        modalFilter,
        personTypeInFilter,
        setPersonTypeInFilter,
        setModalFilter,
        searchParams,
        filterParams,
        handleInputChange,
        handleSelectChange,
        handleModalChange,
    };

}
