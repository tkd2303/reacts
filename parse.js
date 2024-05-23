import React, { useEffect } from 'react';
import xml2js from 'xml2js';

const SAMLResponse = () => {
    useEffect(() => {
        const samlResponse = `
            <saml2:AttributeStatement xmlns:saml2="urn:oasis:names:tc:SAML:2.0:assertion">
                <saml2:Attribute Name="User"
                                NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified">
                    <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                        xsi:type="xs:string">
                        shivam.209302005@muj.manipal.edu
                    </saml2:AttributeValue>
                </saml2:Attribute>
            </saml2:AttributeStatement>
        `;

        const parseString = xml2js.parseString;

        parseString(samlResponse, { explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] }, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return;
            }

            const attribute = result['saml2:AttributeStatement']['saml2:Attribute'];
            const attributeName = attribute['$']['Name'];
            const attributeValue = attribute['saml2:AttributeValue']['_'];

            console.log(`${attributeName}: ${attributeValue}`);
        });
    }, []);

    return (
        <div>
            Parsing SAML Response...
        </div>
    );
};

export default SAMLResponse;
