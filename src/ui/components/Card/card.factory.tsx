import { RequestStateEnum } from '@/data/enum/request_state.enum';
import { CardFactoryType, CardHeadDataType } from './card.type';
import { getNestedValue } from '@/data/utils/getValueByKey';

export const CardFactory = <T,>({ bodyData }: CardFactoryType<T>) => {

    const renderCard = (header: CardHeadDataType<T>) => {
        return {
            [RequestStateEnum.SUCCESS]: (
                <div>
                    {bodyData &&
                        (header.render
                            ? header.render(bodyData)
                            : (getNestedValue(bodyData, header.key!)) +
                            ((bodyData.sellingPriceOfBuilding1KVM != 0 && bodyData.sellingPriceOfLand1KVM != 0 &&
                                bodyData.sellingTotalPriceOfBuilding != 0 && bodyData.sellingTotalPriceOfLand != 0 &&
                                bodyData.sellingTotalPriceOfObject != 0
                            ) &&
                                header.suffix || ""))}
                </div>
            ),
            [RequestStateEnum.EMPTY]: <p>--- </p>,
        };
    };

    return {
        renderCard
    }
}
