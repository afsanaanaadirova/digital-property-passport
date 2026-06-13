import { http, HttpResponse } from "msw";

export const handlers = [
    http.post("*/User/Login", () => {
        return HttpResponse.json({
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZnVsbG5hbWUiOiJBZnNhbmEgS2FyaW1kdWtodCIsImVtYWlsIjoiZGVtb0B0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxNjAwMDAwMCwiZXhwIjo5OTk5OTk5OTk5fQ.mock-signature",
        });
    }),
    // Passport siyahısı
    http.get("*/Passport/GetAll", () => {
        return HttpResponse.json({
            pageResponse: {
                size: 10,
                index: 1,
                total: 2,
                hasNext: false,
                hasPrev: false,
                min: 1,
                max: 2,
                datas: [
                    {
                        id: 1,
                        passportNumber: "AA123456",
                        ownerName: "John Smith",
                        finOrVoen: "ABC1234",
                        address: "Baku, Azerbaijan",
                        destination: "Sabail District",
                        propertyType: "Apartment",
                        ownershipType: "Private",
                        status: true,
                        actions: [
                            {
                                id: 1,
                                name: "View",
                            },
                            {
                                id: 2,
                                name: "Edit",
                            },
                        ],
                    },
                    {
                        id: 2,
                        passportNumber: "BB987654",
                        ownerName: "Sarah Johnson",
                        finOrVoen: "XYZ5678",
                        address: "Baku, Azerbaijan",
                        destination: "Narimanov District",
                        propertyType: "Office",
                        ownershipType: "Corporate",
                        status: false,
                        actions: [
                            {
                                id: 1,
                                name: "View",
                            },
                        ],
                    },
                ],
            },
        });
    }),
    // Passport detalı
    http.get("*/Passport/GetById", ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");
        return HttpResponse.json({
            id: Number(id),
            ownerName: "John Smith",
            destination: "Sabail District",
            area: "Zone A",
            status: "Pending",
        });
    }),

    // Passport yarat
    http.post("*/Passport/Create", () => {
        return HttpResponse.json({ success: true, id: 3 });
    }),

    // Passport sil
    http.delete("*/Passport/Delete", () => {
        return HttpResponse.json({ success: true });
    }),

    // Dropdown — Destinations
    http.get("*/DropDown/Destinations", () => {
        return HttpResponse.json({
            destinations: [
                { id: 1, name: "Sabail District" },
                { id: 2, name: "Narimanov District" },
            ]
        });
    }),

    // Dropdown — Owner Types
    http.get("*/DropDown/OwnerTypes", () => {
        return HttpResponse.json({
            ownerTypes: [
                { id: 1, name: "Individual" },
                { id: 2, name: "Corporate" },
                { id: 3, name: "Government" },
            ]
        });
    }),
    http.get("*/DropDown/Areas", () => {
        return HttpResponse.json({
            areas: [
                { id: 1, name: "Zone A", description: "Description" },
                { id: 2, name: "Zone B", description: "Description" },
                { id: 3, name: "Zone C", description: "Description" },
            ]
        });
    }),

    http.get("*/DropDown/SaleTransactionTypes", () => {
        return HttpResponse.json({
            saleTransactionTypes: [
                { id: 1, name: "Sale" },
                { id: 2, name: "Rent" },
            ]
        });
    }),

    http.get("*/DropDown/BuildingPropertyTypes", () => {
        return HttpResponse.json({
            buildingPropertyTypes: [
                { id: 1, name: "Apartment" },
                { id: 2, name: "Villa" },
                { id: 3, name: "Office" },
            ]
        });
    }),

    http.get("*/DropDown/BuildingOwnershipTypes", () => {
        return HttpResponse.json({
            buildingOwnershipTypes: [
                { id: 1, name: "Private" },
                { id: 2, name: "State" },
            ]
        });
    }),

    http.get("*/DropDown/LandPropertyTypes", () => {
        return HttpResponse.json({
            landPropertyTypes: [
                { id: 1, name: "Agricultural" },
                { id: 2, name: "Residential" },
            ]
        });
    }),

    http.get("*/DropDown/LandOwnershipTypes", () => {
        return HttpResponse.json({
            landOwnershipTypes: [
                { id: 1, name: "Private" },
                { id: 2, name: "Municipality" },
            ]
        });
    }),
    http.get("*/DropDown/PassportFileTypes", () => {
        return HttpResponse.json({
            passportFileTypes: [
                {
                    id: 1,
                    name: "PDF",
                    fileAccept: ".pdf",
                },
                {
                    id: 2,
                    name: "Word",
                    fileAccept: ".doc,.docx",
                },
                {
                    id: 3,
                    name: "Excel",
                    fileAccept: ".xls,.xlsx",
                },
                {
                    id: 4,
                    name: "Image",
                    fileAccept: ".jpg,.jpeg,.png",
                },
            ],
        });
    }),
    http.get("*/DropDown/CulturalMonuments", () => {
        return HttpResponse.json({
            culturalMonuments: [
                { id: 1, name: "UNESCO Site" },
                { id: 2, name: "Historical Monument" },
            ],
        });
    }),
];