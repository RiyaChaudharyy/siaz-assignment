import { useEffect } from 'react';
import { Provider } from 'react-redux';
import type { AppStore } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProduct } from '../store/slices/productSlice';
import { ModelProvider } from '../theme/ModelContext';
import type { WidgetConfig } from '../bootstrap/types';
import { Modal } from './Modal/Modal';
import { InactiveMessage } from './InactiveMessage';
import { Loader } from './components/Loader';

export interface WidgetProps {
  store: AppStore;
  config: WidgetConfig;
}

const WidgetInner = ({ config }: { config: WidgetConfig }) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.product.status);
  const product = useAppSelector((s) => s.product.data);

  useEffect(() => {
    dispatch(fetchProduct({ brandCode: config.brandCode, productCode: config.productCode }));
  }, [dispatch, config.brandCode, config.productCode]);

  if (status === 'idle' || status === 'loading') {
    return <Loader label="Analyzing the product…" />;
  }

  if (status === 'error') {
    return (
      <InactiveMessage
        title="Size recommendation unavailable"
        body="We could not load this product right now. Please try again later."
      />
    );
  }

  if (status === 'inactive') {
    return (
      <InactiveMessage
        title="Size recommendation unavailable"
        body={`${product?.name ?? 'This product'} is not enabled for SAIZ recommendations.`}
      />
    );
  }

  return <Modal brandCode={config.brandCode} />;
};

export const Widget = ({ store, config }: WidgetProps) => (
  <Provider store={store}>
    <ModelProvider brand={config.brandCode}>
      <WidgetInner config={config} />
    </ModelProvider>
  </Provider>
);
