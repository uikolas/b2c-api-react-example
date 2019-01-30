import * as React from 'react';

export const Breadcrumbs: any = props => {
    let parts = this.props.location.pathname.split('/');
    const place = parts[ parts.length - 1 ];

    console.log(place);
    console.log(this.props.location);

    return (
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum deserunt excepturi exercitationem minima necessitatibus nihil, odit quae quibusdam reiciendis repellendus repudiandae sed voluptate voluptatum. Exercitationem omnis porro suscipit tenetur voluptatibus?
        </div>
    );
};
