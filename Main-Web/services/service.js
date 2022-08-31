function Service() {
    this.getListProduct = function () {
        return axios({
            url: "https://6309e00c32499100327d0170.mockapi.io/product/QLSP",
            method: "GET",
        });
    };

    this.deleteProductApi = function (id) {
        return axios({
            url: `https://6309e00c32499100327d0170.mockapi.io/product/QLSP${id}`,
            method: "DELETE",
        });
    };

    this.addProductApi = function (product) {
        return axios({
            url: "https://6309e00c32499100327d0170.mockapi.io/product/QLSP",
            method: "POST",
            data: product,
        });
    };

    this.getProductById = function (id) {
        return axios({
            url: `https://6309e00c32499100327d0170.mockapi.io/product/QLSP/${id}`,
            method: "GET",
        });
    };

    this.updateProductApi = function (product) {
        return axios({
            url: `https://6309e00c32499100327d0170.mockapi.io/product/QLSP/${product.id}`,
            method: "PUT",
            data: product,
        });
    };
}
