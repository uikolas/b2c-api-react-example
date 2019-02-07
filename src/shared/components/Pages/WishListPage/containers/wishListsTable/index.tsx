import * as React from 'react';
import { connect } from './connect';
import { FormattedDate, FormattedMessage } from 'react-intl';

import { IWishlist, TWishListId } from '@interfaces/wishlist';
import { WishListsTableProps, WishListsTableState } from './types';
import { ICellInfo, ITableRow } from '@components/Common/AppTable/types';

import { AppTable } from '@components/Common/AppTable';

import { pathWishListPageBase } from '@routes/contentRoutes';

import { NavLink } from 'react-router-dom';
import { Paper, Divider, Typography, TextField, IconButton, withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { styles } from './styles';
import { ClickEvent, InputChangeEvent } from '@interfaces/common/react';

@connect
export class WishListsTableComponent extends React.Component<WishListsTableProps, WishListsTableState> {
    readonly headerCellPart = 'header-';
    readonly bodyCellPart = 'body-';
    readonly headerCells: ICellInfo[] = [
        {content: 'Name', id: `${this.headerCellPart}1`},
        {content: 'Items', id: `${this.headerCellPart}2`},
        {content: 'Created', id: `${this.headerCellPart}3`},
        {content: '', id: `${this.headerCellPart}4`},
        {content: '', id: `${this.headerCellPart}5`},
    ];

    public state: WishListsTableState = {
        name: '',
        updatedName: '',
        updatedList: '',
    };

    public handleChangeUpdatedName = (event: InputChangeEvent): void => {
        event.persist();
        this.setState(() => ({updatedName: event.target.value}));
    };

    public handleUpdateWishlist = (e: ClickEvent) => {
        this.props.updateWishlistAction(this.state.updatedList, this.state.updatedName);
        this.setState(() => ({updatedList: '', updatedName: ''}));
    };

    public handleDeleteWishlist = (wishlistId: TWishListId) => (e: ClickEvent) => {
        this.props.deleteWishlistAction(wishlistId);
    };

    private setUpdatedWishlist = (id: string, name: string) => (e: ClickEvent) => {
        this.setState({
            updatedList: id,
            updatedName: name
        });
    };

    public generateTableRows = (): ITableRow[] => {
        if (!this.props.wishlists) {
            return [];
        }

        const { classes, isLoading } = this.props;
        const tableAction = isLoading ? classes.tableActionDisabled : classes.tableAction;

        return this.props.wishlists.map((item: IWishlist) => ({
            id: item.id,
            cells: [
                {
                    content: (
                        this.state.updatedList && this.state.updatedList === item.id
                            ? (
                                <form noValidate autoComplete="off" className={classes.updateCell}>
                                    <TextField
                                        value={this.state.updatedName}
                                        onChange={this.handleChangeUpdatedName}
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={this.handleUpdateWishlist}
                                        disabled={isLoading}
                                    >
                                        <SaveIcon/>
                                    </IconButton>
                                </form>
                            ) : (
                                <NavLink
                                    className={ classes.link }
                                    to={ `${pathWishListPageBase}/wishlist/${item.name}` }
                                >
                                    {item.name}
                                </NavLink>
                            )
                    ),
                    id: `${this.bodyCellPart}1`
                },
                {content: item.numberOfItems, id: `${this.bodyCellPart}2`},
                {
                    content: <FormattedDate value={new Date(item.createdAt)} year="numeric" month="short"
                                            day="2-digit"/>,
                    id: `${this.bodyCellPart}3`
                },
                {
                    content: (
                        <Typography
                            component="span"
                            className={tableAction}
                            onClick={this.setUpdatedWishlist(item.id, item.name)}
                        >
                            <FormattedMessage id={ 'word.edit.title' } />
                        </Typography>
                    ),
                    id: `${this.bodyCellPart}4`
                },
                {
                    content: (
                        <Typography component="span" className={tableAction}
                                    onClick={this.handleDeleteWishlist(item.id)}>
                            <FormattedMessage id={ 'word.delete.title' } />
                        </Typography>
                    ),
                    id: `${this.bodyCellPart}5`
                },
            ],
        }));
    };

    public render = () => {
        const { classes } = this.props;
        const bodyRows = this.generateTableRows();

        if (!bodyRows.length) {
            return (
                <Paper elevation={0}>
                    <Divider/>

                    <Typography paragraph className={ classes.noItems }>
                        <FormattedMessage id={ 'create.list.message' } />
                    </Typography>
                </Paper>
            );
        }

        return <AppTable headerCells={ this.headerCells } bodyRows={ bodyRows }/>;
    }
}

export const WishListsTable = withStyles(styles)(WishListsTableComponent);
