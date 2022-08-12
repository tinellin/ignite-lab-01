import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  ResolveReference,
} from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../models/customer';
import { CurrentUser, AuthUser } from '../../auth/current-user';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    console.log(user.sub);

    return this.customerService.getCustomersByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllPurchasesFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customerService.getCustomersByAuthUserId(reference.authUserId);
  }
}
