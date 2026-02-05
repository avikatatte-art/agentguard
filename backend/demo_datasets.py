"""
Demo Datasets for AgentGuard
Multiple realistic agent system scenarios for demonstration
"""

def get_ecommerce_dataset():
    """E-commerce platform with 24 agents"""
    agents = [
        {
            "id": "pricing-agent",
            "name": "PricingAgent",
            "type": "core_service",
            "risk": "critical",
            "version": "2.4.1",
            "uptime": "99.2%",
            "requests_per_min": 5234,
            "avg_latency_ms": 145,
            "last_deployed": "2026-01-28T10:30:00Z",
            "owner": "pricing-team@company.com"
        },
        {
            "id": "inventory-agent",
            "name": "InventoryAgent",
            "type": "core_service",
            "risk": "high",
            "version": "3.1.0",
            "uptime": "98.7%",
            "requests_per_min": 4521,
            "avg_latency_ms": 178,
            "last_deployed": "2026-01-25T14:20:00Z",
            "owner": "inventory-team@company.com"
        },
        {
            "id": "payment-agent",
            "name": "PaymentAgent",
            "type": "core_service",
            "risk": "critical",
            "version": "4.2.3",
            "uptime": "99.95%",
            "requests_per_min": 3892,
            "avg_latency_ms": 234,
            "last_deployed": "2026-02-01T09:15:00Z",
            "owner": "payments-team@company.com"
        },
        {
            "id": "shipping-agent",
            "name": "ShippingAgent",
            "type": "core_service",
            "risk": "high",
            "version": "2.8.5",
            "uptime": "97.8%",
            "requests_per_min": 2156,
            "avg_latency_ms": 456,
            "last_deployed": "2026-01-20T16:45:00Z",
            "owner": "logistics-team@company.com"
        },
        {
            "id": "cart-agent",
            "name": "CartAgent",
            "type": "user_facing",
            "risk": "high",
            "version": "1.9.2",
            "uptime": "98.5%",
            "requests_per_min": 8934,
            "avg_latency_ms": 89,
            "last_deployed": "2026-01-30T11:00:00Z",
            "owner": "frontend-team@company.com"
        },
        {
            "id": "checkout-agent",
            "name": "CheckoutAgent",
            "type": "user_facing",
            "risk": "critical",
            "version": "3.5.1",
            "uptime": "99.1%",
            "requests_per_min": 3421,
            "avg_latency_ms": 312,
            "last_deployed": "2026-02-02T08:30:00Z",
            "owner": "checkout-team@company.com"
        },
        {
            "id": "order-agent",
            "name": "OrderAgent",
            "type": "core_service",
            "risk": "critical",
            "version": "2.7.4",
            "uptime": "99.3%",
            "requests_per_min": 2876,
            "avg_latency_ms": 267,
            "last_deployed": "2026-01-27T13:20:00Z",
            "owner": "orders-team@company.com"
        },
        {
            "id": "fraud-detection-agent",
            "name": "FraudDetectionAgent",
            "type": "security",
            "risk": "high",
            "version": "1.4.8",
            "uptime": "99.8%",
            "requests_per_min": 4123,
            "avg_latency_ms": 423,
            "last_deployed": "2026-01-15T10:00:00Z",
            "owner": "security-team@company.com"
        },
        {
            "id": "recommendation-agent",
            "name": "RecommendationAgent",
            "type": "ml_service",
            "risk": "medium",
            "version": "5.2.1",
            "uptime": "96.5%",
            "requests_per_min": 6789,
            "avg_latency_ms": 678,
            "last_deployed": "2026-01-18T15:30:00Z",
            "owner": "ml-team@company.com"
        },
        {
            "id": "search-agent",
            "name": "SearchAgent",
            "type": "user_facing",
            "risk": "medium",
            "version": "3.3.2",
            "uptime": "97.2%",
            "requests_per_min": 12456,
            "avg_latency_ms": 234,
            "last_deployed": "2026-01-22T09:45:00Z",
            "owner": "search-team@company.com"
        },
        {
            "id": "notification-agent",
            "name": "NotificationAgent",
            "type": "communication",
            "risk": "low",
            "version": "2.1.5",
            "uptime": "98.9%",
            "requests_per_min": 1876,
            "avg_latency_ms": 156,
            "last_deployed": "2026-01-29T14:00:00Z",
            "owner": "comms-team@company.com"
        },
        {
            "id": "analytics-agent",
            "name": "AnalyticsAgent",
            "type": "data_service",
            "risk": "low",
            "version": "4.0.2",
            "uptime": "95.4%",
            "requests_per_min": 987,
            "avg_latency_ms": 1234,
            "last_deployed": "2026-01-12T11:30:00Z",
            "owner": "data-team@company.com"
        },
        {
            "id": "warehouse-agent",
            "name": "WarehouseAgent",
            "type": "integration",
            "risk": "medium",
            "version": "1.8.3",
            "uptime": "96.8%",
            "requests_per_min": 456,
            "avg_latency_ms": 567,
            "last_deployed": "2026-01-24T10:15:00Z",
            "owner": "logistics-team@company.com"
        },
        {
            "id": "supplier-agent",
            "name": "SupplierAgent",
            "type": "integration",
            "risk": "medium",
            "version": "2.3.1",
            "uptime": "94.2%",
            "requests_per_min": 234,
            "avg_latency_ms": 890,
            "last_deployed": "2026-01-10T16:00:00Z",
            "owner": "supply-chain@company.com"
        },
        {
            "id": "email-agent",
            "name": "EmailAgent",
            "type": "communication",
            "risk": "low",
            "version": "3.2.4",
            "uptime": "99.1%",
            "requests_per_min": 678,
            "avg_latency_ms": 345,
            "last_deployed": "2026-02-03T09:00:00Z",
            "owner": "comms-team@company.com"
        },
        {
            "id": "tax-agent",
            "name": "TaxAgent",
            "type": "compliance",
            "risk": "high",
            "version": "1.5.2",
            "uptime": "99.5%",
            "requests_per_min": 1234,
            "avg_latency_ms": 289,
            "last_deployed": "2026-01-31T12:00:00Z",
            "owner": "finance-team@company.com"
        },
        {
            "id": "refund-agent",
            "name": "RefundAgent",
            "type": "core_service",
            "risk": "medium",
            "version": "2.2.8",
            "uptime": "97.6%",
            "requests_per_min": 567,
            "avg_latency_ms": 456,
            "last_deployed": "2026-01-26T15:30:00Z",
            "owner": "support-team@company.com"
        },
        {
            "id": "customer-support-agent",
            "name": "CustomerSupportAgent",
            "type": "user_facing",
            "risk": "medium",
            "version": "4.1.3",
            "uptime": "98.3%",
            "requests_per_min": 2345,
            "avg_latency_ms": 678,
            "last_deployed": "2026-01-23T10:45:00Z",
            "owner": "support-team@company.com"
        },
        {
            "id": "loyalty-agent",
            "name": "LoyaltyAgent",
            "type": "marketing",
            "risk": "low",
            "version": "1.6.4",
            "uptime": "96.1%",
            "requests_per_min": 890,
            "avg_latency_ms": 234,
            "last_deployed": "2026-01-19T14:20:00Z",
            "owner": "marketing-team@company.com"
        },
        {
            "id": "review-agent",
            "name": "ReviewAgent",
            "type": "user_facing",
            "risk": "low",
            "version": "2.4.6",
            "uptime": "95.8%",
            "requests_per_min": 456,
            "avg_latency_ms": 345,
            "last_deployed": "2026-01-17T11:00:00Z",
            "owner": "product-team@company.com"
        },
        {
            "id": "returns-agent",
            "name": "ReturnsAgent",
            "type": "core_service",
            "risk": "medium",
            "version": "1.9.7",
            "uptime": "97.4%",
            "requests_per_min": 345,
            "avg_latency_ms": 567,
            "last_deployed": "2026-01-21T13:45:00Z",
            "owner": "logistics-team@company.com"
        },
        # Shadow agents (legacy/undocumented)
        {
            "id": "legacy-pricing-v1",
            "name": "LegacyPricingV1",
            "type": "shadow_agent",
            "risk": "high",
            "version": "0.9.1",
            "uptime": "89.2%",
            "requests_per_min": 123,
            "avg_latency_ms": 1890,
            "last_deployed": "2024-06-15T10:00:00Z",
            "owner": "unknown"
        },
        {
            "id": "old-inventory-sync",
            "name": "OldInventorySync",
            "type": "shadow_agent",
            "risk": "medium",
            "version": "1.2.3",
            "uptime": "92.5%",
            "requests_per_min": 67,
            "avg_latency_ms": 1456,
            "last_deployed": "2024-11-20T14:30:00Z",
            "owner": "unknown"
        },
        {
            "id": "deprecated-payment-gateway",
            "name": "DeprecatedPaymentGateway",
            "type": "shadow_agent",
            "risk": "critical",
            "version": "2.1.0",
            "uptime": "95.7%",
            "requests_per_min": 234,
            "avg_latency_ms": 987,
            "last_deployed": "2025-03-10T09:00:00Z",
            "owner": "unknown"
        },
        {
            "id": "manual-override-bot",
            "name": "ManualOverrideBot",
            "type": "shadow_agent",
            "risk": "high",
            "version": "0.5.2",
            "uptime": "94.3%",
            "requests_per_min": 45,
            "avg_latency_ms": 2345,
            "last_deployed": "2023-01-05T16:00:00Z",
            "owner": "unknown"
        },
    ]
    
    dependencies = [
        {"source": "pricing-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.98},
        {"source": "pricing-agent", "target": "legacy-pricing-v1", "type": "fallback", "confidence": 0.85},
        {"source": "inventory-agent", "target": "warehouse-agent", "type": "api_call", "confidence": 0.97},
        {"source": "inventory-agent", "target": "shipping-agent", "type": "event", "confidence": 0.92},
        {"source": "inventory-agent", "target": "old-inventory-sync", "type": "sync", "confidence": 0.78},
        {"source": "shipping-agent", "target": "warehouse-agent", "type": "api_call", "confidence": 0.96},
        {"source": "cart-agent", "target": "pricing-agent", "type": "api_call", "confidence": 0.99},
        {"source": "cart-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.94},
        {"source": "checkout-agent", "target": "cart-agent", "type": "api_call", "confidence": 0.98},
        {"source": "checkout-agent", "target": "payment-agent", "type": "api_call", "confidence": 0.99},
        {"source": "checkout-agent", "target": "tax-agent", "type": "api_call", "confidence": 0.97},
        {"source": "payment-agent", "target": "fraud-detection-agent", "type": "api_call", "confidence": 0.98},
        {"source": "payment-agent", "target": "deprecated-payment-gateway", "type": "fallback", "confidence": 0.82},
        {"source": "order-agent", "target": "checkout-agent", "type": "api_call", "confidence": 0.99},
        {"source": "order-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.96},
        {"source": "order-agent", "target": "notification-agent", "type": "event", "confidence": 0.93},
        {"source": "customer-support-agent", "target": "order-agent", "type": "api_call", "confidence": 0.95},
        {"source": "customer-support-agent", "target": "refund-agent", "type": "api_call", "confidence": 0.91},
        {"source": "refund-agent", "target": "payment-agent", "type": "api_call", "confidence": 0.97},
        {"source": "refund-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.94},
        {"source": "returns-agent", "target": "refund-agent", "type": "api_call", "confidence": 0.96},
        {"source": "returns-agent", "target": "warehouse-agent", "type": "api_call", "confidence": 0.93},
        {"source": "recommendation-agent", "target": "analytics-agent", "type": "api_call", "confidence": 0.89},
        {"source": "search-agent", "target": "recommendation-agent", "type": "api_call", "confidence": 0.87},
        {"source": "review-agent", "target": "order-agent", "type": "api_call", "confidence": 0.92},
        {"source": "loyalty-agent", "target": "order-agent", "type": "api_call", "confidence": 0.90},
        {"source": "supplier-agent", "target": "inventory-agent", "type": "api_call", "confidence": 0.88},
        {"source": "email-agent", "target": "notification-agent", "type": "event", "confidence": 0.95},
    ]
    
    return {"agents": agents, "dependencies": dependencies}


def get_ai_content_pipeline_dataset():
    """AI content generation pipeline with 18 agents"""
    agents = [
        {
            "id": "content-planner",
            "name": "ContentPlannerAgent",
            "type": "core_service",
            "risk": "critical",
            "version": "3.1.2",
            "uptime": "98.9%",
            "requests_per_min": 1234,
            "avg_latency_ms": 456,
            "last_deployed": "2026-02-01T10:00:00Z",
            "owner": "content-team@media.com"
        },
        {
            "id": "text-generator",
            "name": "TextGeneratorAgent",
            "type": "ml_service",
            "risk": "critical",
            "version": "4.5.1",
            "uptime": "97.8%",
            "requests_per_min": 3456,
            "avg_latency_ms": 2345,
            "last_deployed": "2026-01-28T14:30:00Z",
            "owner": "ml-team@media.com"
        },
        {
            "id": "image-generator",
            "name": "ImageGeneratorAgent",
            "type": "ml_service",
            "risk": "high",
            "version": "2.8.3",
            "uptime": "96.5%",
            "requests_per_min": 2345,
            "avg_latency_ms": 4567,
            "last_deployed": "2026-01-25T11:00:00Z",
            "owner": "ml-team@media.com"
        },
        {
            "id": "video-editor",
            "name": "VideoEditorAgent",
            "type": "ml_service",
            "risk": "high",
            "version": "1.9.4",
            "uptime": "95.2%",
            "requests_per_min": 567,
            "avg_latency_ms": 8901,
            "last_deployed": "2026-01-20T16:45:00Z",
            "owner": "video-team@media.com"
        },
        {
            "id": "quality-checker",
            "name": "QualityCheckerAgent",
            "type": "validation",
            "risk": "critical",
            "version": "3.2.1",
            "uptime": "99.1%",
            "requests_per_min": 4567,
            "avg_latency_ms": 678,
            "last_deployed": "2026-02-02T09:15:00Z",
            "owner": "quality-team@media.com"
        },
        {
            "id": "seo-optimizer",
            "name": "SEOOptimizerAgent",
            "type": "optimization",
            "risk": "medium",
            "version": "2.4.5",
            "uptime": "97.6%",
            "requests_per_min": 890,
            "avg_latency_ms": 345,
            "last_deployed": "2026-01-30T13:20:00Z",
            "owner": "seo-team@media.com"
        },
        {
            "id": "publish-agent",
            "name": "PublishAgent",
            "type": "core_service",
            "risk": "critical",
            "version": "4.1.2",
            "uptime": "99.5%",
            "requests_per_min": 1234,
            "avg_latency_ms": 234,
            "last_deployed": "2026-02-03T08:00:00Z",
            "owner": "platform-team@media.com"
        },
        {
            "id": "translation-agent",
            "name": "TranslationAgent",
            "type": "ml_service",
            "risk": "medium",
            "version": "3.3.7",
            "uptime": "96.8%",
            "requests_per_min": 1567,
            "avg_latency_ms": 1234,
            "last_deployed": "2026-01-27T15:30:00Z",
            "owner": "localization@media.com"
        },
        {
            "id": "fact-checker",
            "name": "FactCheckerAgent",
            "type": "validation",
            "risk": "high",
            "version": "2.1.8",
            "uptime": "98.3%",
            "requests_per_min": 678,
            "avg_latency_ms": 2345,
            "last_deployed": "2026-01-29T10:45:00Z",
            "owner": "editorial@media.com"
        },
        {
            "id": "thumbnail-generator",
            "name": "ThumbnailGeneratorAgent",
            "type": "ml_service",
            "risk": "low",
            "version": "1.7.2",
            "uptime": "95.4%",
            "requests_per_min": 890,
            "avg_latency_ms": 567,
            "last_deployed": "2026-01-24T12:00:00Z",
            "owner": "design-team@media.com"
        },
        {
            "id": "analytics-tracker",
            "name": "AnalyticsTrackerAgent",
            "type": "data_service",
            "risk": "low",
            "version": "2.9.1",
            "uptime": "94.7%",
            "requests_per_min": 2345,
            "avg_latency_ms": 123,
            "last_deployed": "2026-01-22T14:30:00Z",
            "owner": "data-team@media.com"
        },
        {
            "id": "social-distributor",
            "name": "SocialDistributorAgent",
            "type": "integration",
            "risk": "medium",
            "version": "3.5.4",
            "uptime": "97.2%",
            "requests_per_min": 1234,
            "avg_latency_ms": 456,
            "last_deployed": "2026-01-31T11:15:00Z",
            "owner": "social-team@media.com"
        },
        {
            "id": "copyright-checker",
            "name": "CopyrightCheckerAgent",
            "type": "compliance",
            "risk": "high",
            "version": "1.8.6",
            "uptime": "99.2%",
            "requests_per_min": 567,
            "avg_latency_ms": 890,
            "last_deployed": "2026-02-01T09:30:00Z",
            "owner": "legal@media.com"
        },
        {
            "id": "monetization-agent",
            "name": "MonetizationAgent",
            "type": "business",
            "risk": "high",
            "version": "2.6.3",
            "uptime": "98.5%",
            "requests_per_min": 890,
            "avg_latency_ms": 234,
            "last_deployed": "2026-01-26T16:00:00Z",
            "owner": "revenue@media.com"
        },
        {
            "id": "archive-manager",
            "name": "ArchiveManagerAgent",
            "type": "storage",
            "risk": "low",
            "version": "1.4.2",
            "uptime": "96.1%",
            "requests_per_min": 234,
            "avg_latency_ms": 1234,
            "last_deployed": "2026-01-18T13:45:00Z",
            "owner": "platform-team@media.com"
        },
        # Shadow agents
        {
            "id": "legacy-text-gen",
            "name": "LegacyTextGenerator",
            "type": "shadow_agent",
            "risk": "medium",
            "version": "1.0.5",
            "uptime": "91.3%",
            "requests_per_min": 123,
            "avg_latency_ms": 3456,
            "last_deployed": "2024-08-10T10:00:00Z",
            "owner": "unknown"
        },
        {
            "id": "old-image-processor",
            "name": "OldImageProcessor",
            "type": "shadow_agent",
            "risk": "low",
            "version": "0.9.2",
            "uptime": "88.7%",
            "requests_per_min": 67,
            "avg_latency_ms": 2345,
            "last_deployed": "2024-05-15T14:20:00Z",
            "owner": "unknown"
        },
        {
            "id": "manual-review-bot",
            "name": "ManualReviewBot",
            "type": "shadow_agent",
            "risk": "medium",
            "version": "0.7.1",
            "uptime": "93.5%",
            "requests_per_min": 89,
            "avg_latency_ms": 4567,
            "last_deployed": "2024-11-22T11:30:00Z",
            "owner": "unknown"
        },
    ]
    
    dependencies = [
        {"source": "content-planner", "target": "text-generator", "type": "api_call", "confidence": 0.99},
        {"source": "content-planner", "target": "image-generator", "type": "api_call", "confidence": 0.97},
        {"source": "text-generator", "target": "quality-checker", "type": "api_call", "confidence": 0.98},
        {"source": "text-generator", "target": "legacy-text-gen", "type": "fallback", "confidence": 0.82},
        {"source": "image-generator", "target": "quality-checker", "type": "api_call", "confidence": 0.96},
        {"source": "image-generator", "target": "old-image-processor", "type": "fallback", "confidence": 0.75},
        {"source": "video-editor", "target": "image-generator", "type": "api_call", "confidence": 0.94},
        {"source": "quality-checker", "target": "fact-checker", "type": "api_call", "confidence": 0.95},
        {"source": "quality-checker", "target": "copyright-checker", "type": "api_call", "confidence": 0.97},
        {"source": "quality-checker", "target": "manual-review-bot", "type": "fallback", "confidence": 0.68},
        {"source": "seo-optimizer", "target": "text-generator", "type": "api_call", "confidence": 0.91},
        {"source": "publish-agent", "target": "quality-checker", "type": "api_call", "confidence": 0.99},
        {"source": "publish-agent", "target": "seo-optimizer", "type": "api_call", "confidence": 0.93},
        {"source": "publish-agent", "target": "social-distributor", "type": "event", "confidence": 0.96},
        {"source": "translation-agent", "target": "text-generator", "type": "api_call", "confidence": 0.92},
        {"source": "thumbnail-generator", "target": "image-generator", "type": "api_call", "confidence": 0.89},
        {"source": "social-distributor", "target": "analytics-tracker", "type": "event", "confidence": 0.94},
        {"source": "monetization-agent", "target": "publish-agent", "type": "api_call", "confidence": 0.96},
        {"source": "archive-manager", "target": "publish-agent", "type": "event", "confidence": 0.88},
    ]
    
    return {"agents": agents, "dependencies": dependencies}


def get_dataset(demo_type: str):
    """Get dataset by type"""
    datasets = {
        "ecommerce": get_ecommerce_dataset,
        "content": get_ai_content_pipeline_dataset,
    }
    
    dataset_func = datasets.get(demo_type, get_ecommerce_dataset)
    return dataset_func()
