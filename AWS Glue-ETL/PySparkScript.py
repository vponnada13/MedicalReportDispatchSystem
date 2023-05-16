from datetime import datetime
from pyspark.context import SparkContext
import pyspark.sql.functions as f

from awsglue.utils import getResolvedOptions

from awsglue.context import GlueContext

from awsglue.dynamicframe import DynamicFrame

from awsglue.job import Job

spark_context=SparkContext.getOrCreate()
glue_context=GlueContext(spark_context)
session=glue_context.spark_session

#Parameters
glue_db="virtualdb"
glue_tb="input"
s3_write_path="s3://dbmsprojectumkc/output"
###
##EXTRACT##
##

dynamic_frame_read=glue_context.create_dynamic_frame.from_catalog(database=glue_db,table_name=glue_tb)

#Convert dynamic frame
data_frame=dynamic_frame_read.toDF()


#transform

data_frame_aggregated = data_frame.groupby("Priority").agg(
f.mean(f.col("Age")).alias('Average_Age'),
f.mean(f.col("BloodSugarLevel")).alias('avg_BloodSugarLevel'),
)


#load
data_frame_aggregated = data_frame_aggregated.repartition(1)
dynamic_frame_write = DynamicFrame.fromDF(data_frame_aggregated,glue_context,"dynamic_frame_write")

glue_context.write_dynamic_frame.from_options(
frame = dynamic_frame_write,
connection_type="s3",
connection_options={
"path":s3_write_path,
},
format="csv"
)

