from django.urls import path
from .views import BarChartView, CandleStickView, LineChartView, PieChartView

urlpatterns = [
    path('candlestick-data/', CandleStickView.as_view(), name='candlestick-data'),
    path('line-chart-data/', LineChartView.as_view(), name='line-chart-data'),
    path('bar-chart-data/', BarChartView.as_view(), name='bar-chart-data'),
    path('pie-chart-data/', PieChartView.as_view(), name='pie-chart-data'),
]
