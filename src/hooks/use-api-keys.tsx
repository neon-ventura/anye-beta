
import { useState, useEffect } from 'react';

interface MarketplaceApiKeys {
  accessToken: string;
  clientId: string;
  clientSecret: string;
}

interface ApiKeys {
  mercadolivre?: MarketplaceApiKeys;
  shopee?: MarketplaceApiKeys;
  scrapeless?: string;
}

export function useApiKeys() {
  const [apiKeys, setApiKeysState] = useState<ApiKeys>(() => {
    // Initialize from localStorage if available
    const savedKeys = localStorage.getItem('anye_api_keys');
    return savedKeys ? JSON.parse(savedKeys) : {};
  });

  // Update localStorage whenever apiKeys change
  useEffect(() => {
    localStorage.setItem('anye_api_keys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  const setApiKey = (
    key: 'mercadolivre' | 'shopee' | 'scrapeless', 
    value: MarketplaceApiKeys | string
  ) => {
    setApiKeysState(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const hasValidApiKeys = (marketplace: 'mercadolivre' | 'shopee') => {
    const keys = apiKeys[marketplace];
    return !!(
      keys && 
      keys.accessToken && 
      keys.clientId && 
      keys.clientSecret
    );
  };

  const hasScrapelessApiKey = () => {
    return !!apiKeys.scrapeless;
  };

  return {
    apiKeys,
    setApiKey,
    hasValidApiKeys,
    hasScrapelessApiKey
  };
}
