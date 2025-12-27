// Load XML Data
function loadXMLData(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/external_feed.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseXML);
        }
    };
    xhr.send();
}

// Render Product Catalog
function renderCatalog() {
    loadXMLData(function(xml) {
        const products = xml.getElementsByTagName("Item");
        let output = "";
        
        for (let i = 0; i < products.length; i++) {
            let id = products[i].getAttribute("id");
            let name = products[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
            let price = products[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
            let category = products[i].getElementsByTagName("Category")[0].childNodes[0].nodeValue;

            output += `
                <div class="product-card">
                    <h3>${name}</h3>
                    <p><strong>Category:</strong> ${category}</p>
                    <p class="price">$${price}</p>
                    <button onclick="viewProduct('${id}')">View Details</button>
                </div>
            `;
        }
        document.getElementById("catalog-container").innerHTML = output;
    });
}

// View Single Product (Save ID to session and redirect)
function viewProduct(id) {
    sessionStorage.setItem('selectedProductId', id);
    window.location.href = 'product-detail.html';
}

// Render Product Details
function renderProductDetail() {
    const pId = sessionStorage.getItem('selectedProductId');
    if (!pId) return;

    loadXMLData(function(xml) {
        const products = xml.getElementsByTagName("Item");
        for (let i = 0; i < products.length; i++) {
            if (products[i].getAttribute("id") == pId) {
                let name = products[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                let desc = products[i].getElementsByTagName("Description")[0].childNodes[0].nodeValue;
                let brand = products[i].getElementsByTagName("Brand")[0].childNodes[0].nodeValue;
                let price = products[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;

                document.getElementById("detail-container").innerHTML = `
                    <h2>${name}</h2>
                    <p><strong>Brand:</strong> ${brand}</p>
                    <p><strong>Price:</strong> $${price}</p>
                    <p><strong>Description:</strong> ${desc}</p>
                    <button onclick="window.history.back()">Back to Catalog</button>
                `;
            }
        }
    });
}

// Filter by Category
function renderCategory(catFilter) {
    loadXMLData(function(xml) {
        const products = xml.getElementsByTagName("Item");
        let output = "";
        
        for (let i = 0; i < products.length; i++) {
            let category = products[i].getElementsByTagName("Category")[0].childNodes[0].nodeValue;
            
            if (category === catFilter) {
                let name = products[i].getElementsByTagName("Name")[0].childNodes[0].nodeValue;
                let price = products[i].getElementsByTagName("Price")[0].childNodes[0].nodeValue;
                output += `<div class="product-card"><h3>${name}</h3><p>$${price}</p></div>`;
            }
        }
        document.getElementById("category-container").innerHTML = output || "<p>No products found.</p>";
    });
}

// Generate XML String
function generateInternalXML() {
    loadXMLData(function(xml) {
        // Serializing the XML object back to string to simulate "Generation"
        // In a real app, you might restructure this data here.
        var serializer = new XMLSerializer();
        var xmlString = serializer.serializeToString(xml);
        
        document.getElementById("xml-display").innerText = xmlString;
    });
}

// Download XML
function downloadXML() {
    loadXMLData(function(xml) {
        var serializer = new XMLSerializer();
        var xmlString = serializer.serializeToString(xml);
        
        var blob = new Blob([xmlString], {type: "text/xml"});
        var url = URL.createObjectURL(blob);
        
        var a = document.createElement('a');
        a.href = url;
        a.download = "internal_products.xml";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}